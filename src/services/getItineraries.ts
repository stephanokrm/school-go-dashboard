import { RawItinerary, Resource } from "../types";
import { rawItineraryToItinerary } from "../maps/rawItineraryToItinerary";
import axios from "../lib/axios";

interface Options {
  signal?: AbortSignal;
}

export const getItineraries = async ({ signal }: Options = {}) => {
  const {
    data: { data: rawItinerary },
  } = await axios.get<Resource<RawItinerary[]>>(`/api/itinerary`, { signal });

  return Promise.all(rawItinerary.map(rawItineraryToItinerary));
};
