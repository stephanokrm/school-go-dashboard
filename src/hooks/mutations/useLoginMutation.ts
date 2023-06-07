import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { useFormMutation } from "./useFormMutation";
import { useCsrfQuery } from "../queries/useCsrfQuery";
import { LoginForm } from "../../types";

type Response = {
  access_token: string;
  expires_in: number;
};

type SuccessResponse = AxiosResponse<Response>;

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useCsrfQuery();

  return useFormMutation<SuccessResponse, LoginForm>(
    async (user) => {
      return axios.post<Response, SuccessResponse>("/login", user);
    },
    {
      onSuccess: async () => {
        const redirect = router.query.redirect as string | undefined;

        if (redirect) {
          await router.replace(redirect);
        } else {
          await queryClient.invalidateQueries(["getUserByMe"]);
          await router.push("/trips");
        }
      },
    }
  );
};
