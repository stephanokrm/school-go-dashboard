import { RawResponsible, Resource } from "../types";
import { rawResponsibleToResponsible } from "../maps/rawResponsibleToResponsible";
import axios from "../lib/axios";

interface Options {
  signal?: AbortSignal;
}

export const getResponsibles = async ({ signal }: Options = {}) => {
  const {
    data: { data: rawResponsible },
  } = await axios.get<Resource<RawResponsible[]>>(`/responsible`, {
    signal,
  });

  return Promise.all(rawResponsible.map(rawResponsibleToResponsible));
};
