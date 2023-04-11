import { useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { User, RawUser, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { userToRawUser } from "../../maps/userToRawUser";
import { UserEditFieldValues } from "../../../pages/dashboard/usuarios/[id]/editar";
import { UseFormSetError } from "react-hook-form";
import { useGetUserByMeQuery } from "../queries/useGetUserByMeQuery";
import { useRouter } from "next/router";

type Response = Resource<RawUser>;
type SuccessResponse = AxiosResponse<Response>;
interface UseUserUpdateMutation {
  setError: UseFormSetError<UserEditFieldValues>;
}

export const useUserUpdateMutation = ({ setError }: UseUserUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me } = useGetUserByMeQuery();

  return useFormMutation<SuccessResponse, UserEditFieldValues>(
    async (user) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/${user.id}`,
        {
          ...(await userToRawUser(user as User)),
          _method: "PUT",
        }
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        const id = response.data.data.id;

        await queryClient.invalidateQueries(["getUsers"]);
        await queryClient.invalidateQueries(["getUserById", id]);

        if (me?.id === id) {
          await queryClient.invalidateQueries(["getUserByMe"]);
        }

        await router.push("/dashboard/usuarios");
      },
    }
  );
};
