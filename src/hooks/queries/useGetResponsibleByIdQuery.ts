import { useQuery } from "@tanstack/react-query";
import { getResponsibleById } from "../../services/getResponsibleById";

export const useGetResponsibleByIdQuery = (id?: string) => {
  return useQuery(
    ["getResponsibleById", id],
    async ({ signal }) => {
      return getResponsibleById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
