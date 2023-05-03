import axios from "../../lib/axios";
import { User, RawUser, Resource, UserCreateForm } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { userToRawUser } from "../../maps/userToRawUser";
import { UseFormSetError } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawUser>;
type SuccessResponse = AxiosResponse<Response>;
interface UseUserStoreMutation {
  setError: UseFormSetError<UserCreateForm>;
}

export const useUserStoreMutation = ({ setError }: UseUserStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, UserCreateForm>(
    async (user) => {
      return axios.post<Response, SuccessResponse>(
        `/user`,
        await userToRawUser(user as User)
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        await queryClient.invalidateQueries(["getUsers"]);
        await queryClient.invalidateQueries([
          "getUserById",
          response.data.data.id,
        ]);
        await router.push("/usuarios");
      },
    }
  );
};
