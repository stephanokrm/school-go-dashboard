import { useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import {
  Responsible,
  RawResponsible,
  Resource,
  ResponsibleEditForm,
} from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { responsibleToRawResponsible } from "../../maps/responsibleToRawResponsible";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/router";

type Response = Resource<RawResponsible>;
type SuccessResponse = AxiosResponse<Response>;
interface UseResponsibleUpdateMutation {
  setError: UseFormSetError<ResponsibleEditForm>;
}

export const useResponsibleUpdateMutation = ({
  setError,
}: UseResponsibleUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, ResponsibleEditForm>(
    async (responsible) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/${responsible.user.id}/responsible/${responsible.id}`,
        {
          ...(await responsibleToRawResponsible(responsible as Responsible)),
          _method: "PUT",
        }
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        await queryClient.invalidateQueries(["getResponsibles"]);
        await queryClient.invalidateQueries([
          "getResponsibleById",
          response.data.data.id,
        ]);
        await queryClient.invalidateQueries(["getUsers"]);
        await queryClient.invalidateQueries([
          "getUserById",
          response.data.data.id,
        ]);
        await router.push("/dashboard/responsaveis");
      },
    }
  );
};
