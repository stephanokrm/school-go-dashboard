import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

export const useSchoolDestroyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["SchoolDestroy"], async (id: number) => {
    await axios.delete(`/api/school/${id}`);
    await queryClient.invalidateQueries(["getSchools"]);
    await queryClient.invalidateQueries(["getSchoolById", id]);
  });
};
