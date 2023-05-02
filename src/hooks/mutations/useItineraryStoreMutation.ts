import axios from "../../lib/axios";
import {
  Itinerary,
  ItineraryCreateForm,
  RawItinerary,
  Resource,
} from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { itineraryToRawItinerary } from "../../maps/itineraryToRawItinerary";
import { UseFormSetError } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawItinerary>;
type SuccessResponse = AxiosResponse<Response>;
interface UseItineraryStoreMutation {
  setError: UseFormSetError<ItineraryCreateForm>;
}

export const useItineraryStoreMutation = ({
  setError,
}: UseItineraryStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, ItineraryCreateForm>(
    async (itinerary) => {
      return axios.post<Response, SuccessResponse>(
        `/api/itinerary`,
        await itineraryToRawItinerary(itinerary as Itinerary)
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
