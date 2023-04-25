import axios from "../../axios";
import {
  Responsible,
  RawResponsible,
  Resource,
  ResponsibleCreateForm,
} from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { responsibleToRawResponsible } from "../../maps/responsibleToRawResponsible";
import { UseFormSetError } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawResponsible>;
type SuccessResponse = AxiosResponse<Response>;
interface UseResponsibleStoreMutation {
  setError: UseFormSetError<ResponsibleCreateForm>;
}

export const useResponsibleStoreMutation = ({
  setError,
}: UseResponsibleStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, ResponsibleCreateForm>(
    async (responsible) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/responsible`,
        await responsibleToRawResponsible(responsible as Responsible)
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
          response.data.data.user.id,
        ]);
        await router.push("/dashboard/responsaveis");
      },
    }
  );
};
