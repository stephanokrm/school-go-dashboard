import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../../services/getStudentById";

export const useGetStudentByIdQuery = (id?: string) => {
  return useQuery(
    ["getStudentById", id],
    async ({ signal }) => {
      return getStudentById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
