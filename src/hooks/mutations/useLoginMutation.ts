import { AxiosResponse } from "axios";
import { addSeconds } from "date-fns";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { useFormMutation } from "./useFormMutation";
import { FieldValues } from "react-hook-form";

type Data = {
  grant_type: "password";
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
};

type Response = {
  access_token: string;
  expires_in: number;
};

type SuccessResponse = AxiosResponse<Response>;

export const useLoginMutation = <TFieldValues extends FieldValues>() => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [, setCookie] = useCookies(["authorization"]);

  return useFormMutation<SuccessResponse, TFieldValues>(
    (user) => {
      return axios().post<Response, SuccessResponse, Data>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/oauth/token`,
        {
          grant_type: "password",
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
          username: user.email,
          password: user.password ?? "",
        }
      );
    },
    {
      onSuccess: async (response) => {
        setCookie("authorization", response.data.access_token, {
          expires: addSeconds(new Date(), response.data.expires_in),
          sameSite: "strict",
          secure: true,
        });

        await queryClient.invalidateQueries(["getUserByMe"]);
        await router.push("/");
      },
    }
  );
};
