import { useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";
import {
  Itinerary,
  ItineraryEditForm,
  RawItinerary,
  Resource,
} from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { itineraryToRawItinerary } from "../../maps/itineraryToRawItinerary";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/router";

type Response = Resource<RawItinerary>;
type SuccessResponse = AxiosResponse<Response>;
interface UseItineraryUpdateMutation {
  setError: UseFormSetError<ItineraryEditForm>;
}

export const useItineraryUpdateMutation = ({
  setError,
}: UseItineraryUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, ItineraryEditForm>(
    async (itinerary) => {
      return axios.post<Response, SuccessResponse>(
        `/itinerary/${itinerary.id}`,
        {
          ...(await itineraryToRawItinerary(itinerary as Itinerary)),
          _method: "PUT",
        }
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        await queryClient.invalidateQueries(["getItineraries"]);
        await queryClient.invalidateQueries([
          "getItineraryById",
          response.data.data.id,
        ]);
        await router.push("/itinerarios");
      },
    }
  );
};
