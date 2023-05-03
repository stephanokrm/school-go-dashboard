import { RawItinerary, Resource } from "../types";
import axios from "../lib/axios";
import { rawItineraryToItinerary } from "../maps/rawItineraryToItinerary";

interface Options {
  id: string;
  signal?: AbortSignal;
}

export const getItineraryById = async ({ id, signal }: Options) => {
  const {
    data: { data: rawItinerary },
  } = await axios.get<Resource<RawItinerary>>(`/api/itinerary/${id}`, {
    signal,
  });

  return rawItineraryToItinerary(rawItinerary);
};
