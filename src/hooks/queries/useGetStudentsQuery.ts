import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../services/getStudents";

export const useGetStudentsQuery = () => {
  return useQuery(["getStudents"], async ({ signal }) => {
    return getStudents({ signal });
  });
};
