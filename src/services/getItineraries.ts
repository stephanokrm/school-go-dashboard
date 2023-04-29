import { RawItinerary, Resource } from "../types";
import { rawItineraryToItinerary } from "../maps/rawItineraryToItinerary";
import axios from "../axios";

interface Params {
  authorization?: string;
  signal?: AbortSignal;
}

export const getItineraries = async ({
  authorization,
  signal,
}: Params = {}) => {
  const {
    data: { data: rawItinerary },
  } = await axios(authorization).get<Resource<RawItinerary[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/itinerary`,
    { signal }
  );

  return Promise.all(rawItinerary.map(rawItineraryToItinerary));
};
