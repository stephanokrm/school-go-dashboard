import { useQuery } from "@tanstack/react-query";
import { getDriverById } from "../../services/getDriverById";

export const useGetDriverByIdQuery = (id?: string) => {
  return useQuery(
    ["getDriverById", id],
    async ({ signal }) => {
      return getDriverById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
