import { RawItinerary, Resource } from "../types";
import axios from "../axios";
import { rawItineraryToItinerary } from "../maps/rawItineraryToItinerary";

interface Params {
  id: string;
  authorization?: string;
  signal?: AbortSignal;
}

export const getItineraryById = async ({
  id,
  authorization,
  signal,
}: Params) => {
  const {
    data: { data: rawItinerary },
  } = await axios(authorization).get<Resource<RawItinerary>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/itinerary/${id}`,
    { signal }
  );

  return rawItineraryToItinerary(rawItinerary);
};
