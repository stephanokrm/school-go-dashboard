import { useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { School, RawSchool, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { schoolToRawSchool } from "../../maps/schoolToRawSchool";
import { SchoolUpdateFieldValues } from "../../../pages/dashboard/escolas/[id]/editar";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/router";

type Response = Resource<RawSchool>;
type SuccessResponse = AxiosResponse<Response>;
interface UseSchoolUpdateMutation {
  setError: UseFormSetError<SchoolUpdateFieldValues>;
}

export const useSchoolUpdateMutation = ({
  setError,
}: UseSchoolUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, SchoolUpdateFieldValues>(
    async (school) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/school/${school.id}`,
        {
          ...(await schoolToRawSchool(school as School)),
          _method: "PUT",
        }
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
