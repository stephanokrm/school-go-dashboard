import axios from "../../lib/axios";
import { School, RawSchool, Resource, SchoolCreateForm } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { schoolToRawSchool } from "../../maps/schoolToRawSchool";
import { UseFormSetError } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawSchool>;
type SuccessResponse = AxiosResponse<Response>;
interface UseSchoolStoreMutation {
  setError: UseFormSetError<SchoolCreateForm>;
}

export const useSchoolStoreMutation = ({
  setError,
}: UseSchoolStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, SchoolCreateForm>(
    async (school) => {
      return axios.post<Response, SuccessResponse>(
        `/api/school`,
        await schoolToRawSchool(school as School)
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        await queryClient.invalidateQueries(["getSchools"]);
        await queryClient.invalidateQueries([
          "getSchoolById",
          response.data.data.id,
        ]);
        await router.push("/escolas");
      },
    }
  );
};
