import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

export const useStudentDestroyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["StudentDestroy"], async (id: number) => {
    await axios.delete(`/api/student/${id}`);
    await queryClient.invalidateQueries(["getStudents"]);
    await queryClient.invalidateQueries(["getStudentById", id]);
  });
};
