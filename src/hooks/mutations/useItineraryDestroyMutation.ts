import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

export const useItineraryDestroyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["ItineraryDestroy"], async (id: number) => {
    await axios.delete(`/api/itinerary/${id}`);
    await queryClient.invalidateQueries(["getItineraries"]);
    await queryClient.invalidateQueries(["getItineraryById", id]);
  });
};
