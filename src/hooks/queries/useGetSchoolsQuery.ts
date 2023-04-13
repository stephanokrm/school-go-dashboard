import { useQuery } from "@tanstack/react-query";
import { getSchools } from "../../services/getSchools";

export const useGetSchoolsQuery = () => {
  return useQuery(["getSchools"], async ({ signal }) => {
    return getSchools({ signal });
  });
};
