import { useQuery } from "@tanstack/react-query";
import { getItineraryById } from "../../services/getItineraryById";

export const useGetItineraryByIdQuery = (id?: string) => {
  return useQuery(
    ["getItineraryById", id],
    async ({ signal }) => {
      return getItineraryById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
