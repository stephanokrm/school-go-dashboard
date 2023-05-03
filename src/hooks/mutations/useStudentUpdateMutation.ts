import { useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { Student, RawStudent, Resource, StudentEditForm } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { studentToRawStudent } from "../../maps/studentToRawStudent";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/router";

type Response = Resource<RawStudent>;
type SuccessResponse = AxiosResponse<Response>;
interface UseStudentUpdateMutation {
  setError: UseFormSetError<StudentEditForm>;
}

export const useStudentUpdateMutation = ({
  setError,
}: UseStudentUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, StudentEditForm>(
    async (student) => {
      return axios.post<Response, SuccessResponse>(`/student/${student.id}`, {
        ...(await studentToRawStudent(student as Student)),
        _method: "PUT",
      });
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
