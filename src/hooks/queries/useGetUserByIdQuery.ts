import { useQuery } from "@tanstack/react-query";
import { getUserByMe } from "../../services/getUserByMe";
import { getUserById } from "../../services/getUserById";

export const useGetUserByIdQuery = (id?: string) => {
  return useQuery(
    ["getUserById"],
    async ({ signal }) => {
      return getUserById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
