import { useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { User, RawUser, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { userToRawUser } from "../../maps/userToRawUser";
import { UserEditFieldValues } from "../../../pages/dashboard/usuarios/[user]/editar";
import { UseFormSetError } from "react-hook-form";

type Response = Resource<RawUser>;
type SuccessResponse = AxiosResponse<Response>;
interface UseUserUpdateMutation {
  setError: UseFormSetError<UserEditFieldValues>;
}

export const useUserUpdateMutation = ({ setError }: UseUserUpdateMutation) => {
  const queryClient = useQueryClient();

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
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getUserByMe"]);
      },
    }
  );
};
