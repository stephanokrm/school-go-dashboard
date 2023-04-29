import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/getUserById";

export const useGetUserByIdQuery = (id?: string) => {
  return useQuery(
    ["getUserById", id],
    async ({ signal }) => {
      return getUserById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
