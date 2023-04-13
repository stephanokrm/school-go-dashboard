import axios from "../axios";
import { RawAddress } from "../types";

interface Params {
  input?: string;
  authorization?: string;
  signal?: AbortSignal;
}

interface Response {
  predictions: RawAddress[];
}
export const mapsAutocomplete = async ({
  input,
  authorization,
  signal,
}: Params = {}) => {
  const {
    data: { predictions },
  } = await axios(authorization).get<Response>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/maps/autocomplete`,
    { signal, params: { input } }
  );

  return predictions;
};
