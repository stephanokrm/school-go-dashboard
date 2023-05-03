import axios from "../lib/axios";
import { RawAddress } from "../types";

interface Options {
  input?: string;
  signal?: AbortSignal;
}

interface Response {
  predictions: RawAddress[];
}

export const mapsAutocomplete = async ({ input, signal }: Options = {}) => {
  const {
    data: { predictions },
  } = await axios.get<Response>(`/maps/autocomplete`, {
    signal,
    params: { input },
  });

  return predictions;
};
