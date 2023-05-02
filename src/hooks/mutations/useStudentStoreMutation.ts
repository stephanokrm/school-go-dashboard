import axios from "../../lib/axios";
import { Student, RawStudent, Resource, StudentCreateForm } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { studentToRawStudent } from "../../maps/studentToRawStudent";
import { UseFormSetError } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawStudent>;
type SuccessResponse = AxiosResponse<Response>;
interface UseStudentStoreMutation {
  setError: UseFormSetError<StudentCreateForm>;
}

export const useStudentStoreMutation = ({
  setError,
}: UseStudentStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, StudentCreateForm>(
    async (student) => {
      return axios.post<Response, SuccessResponse>(
        `/api/student`,
        await studentToRawStudent(student as Student)
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        await queryClient.invalidateQueries(["getStudents"]);
        await queryClient.invalidateQueries([
          "getStudentById",
          response.data.data.id,
        ]);
        await router.push("/alunos");
      },
    }
  );
};
