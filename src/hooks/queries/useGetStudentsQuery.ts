import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../services/getStudents";

interface Params {
  morning?: boolean;
  afternoon?: boolean;
  night?: boolean;
}

export const useGetStudentsQuery = (params: Params) => {
  return useQuery(["getStudents", params], async ({ signal }) => {
    return getStudents({ params, signal });
  });
};
