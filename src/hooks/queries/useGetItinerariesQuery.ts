import { useQuery } from "@tanstack/react-query";
import { getItineraries } from "../../services/getItineraries";

export const useGetItinerariesQuery = () => {
  return useQuery(["getItineraries"], async ({ signal }) => {
    return getItineraries({ signal });
  });
};
