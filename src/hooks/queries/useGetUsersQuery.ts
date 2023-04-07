import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/getUsers";

export const useGetUsersQuery = () => {
  return useQuery(["getUsers"], async ({ signal }) => {
    return getUsers({ signal });
  });
};
