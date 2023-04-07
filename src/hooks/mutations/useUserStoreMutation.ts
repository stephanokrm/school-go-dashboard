import axios from "../../axios";
import { User, RawUser, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { userToRawUser } from "../../maps/userToRawUser";
import { UseFormSetError } from "react-hook-form";
import { UserStoreFieldValues } from "../../../pages/dashboard/usuarios/cadastrar";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawUser>;
type SuccessResponse = AxiosResponse<Response>;
interface UseUserStoreMutation {
  setError: UseFormSetError<UserStoreFieldValues>;
}

export const useUserStoreMutation = ({ setError }: UseUserStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, UserStoreFieldValues>(
    async (user) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user`,
        await userToRawUser(user as User)
      );
    },
    {
      setError,
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getUserByMe"]);
        await router.push("/dashboard/usuarios");
      },
    }
  );
};
