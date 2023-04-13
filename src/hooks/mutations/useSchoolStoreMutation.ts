import axios from "../../axios";
import { School, RawSchool, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { schoolToRawSchool } from "../../maps/schoolToRawSchool";
import { UseFormSetError } from "react-hook-form";
import { SchoolStoreFieldValues } from "../../../pages/dashboard/escolas/cadastrar";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawSchool>;
type SuccessResponse = AxiosResponse<Response>;
interface UseSchoolStoreMutation {
  setError: UseFormSetError<SchoolStoreFieldValues>;
}

export const useSchoolStoreMutation = ({
  setError,
}: UseSchoolStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, SchoolStoreFieldValues>(
    async (school) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/school`,
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
        await router.push("/dashboard/escolas");
      },
    }
  );
};
