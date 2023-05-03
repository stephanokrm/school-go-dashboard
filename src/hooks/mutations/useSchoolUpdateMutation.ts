import { useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { School, RawSchool, Resource, SchoolEditForm } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { schoolToRawSchool } from "../../maps/schoolToRawSchool";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/router";

type Response = Resource<RawSchool>;
type SuccessResponse = AxiosResponse<Response>;
interface UseSchoolUpdateMutation {
  setError: UseFormSetError<SchoolEditForm>;
}

export const useSchoolUpdateMutation = ({
  setError,
}: UseSchoolUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, SchoolEditForm>(
    async (school) => {
      return axios.post<Response, SuccessResponse>(`/school/${school.id}`, {
        ...(await schoolToRawSchool(school as School)),
        _method: "PUT",
      });
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
