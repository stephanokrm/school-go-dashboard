import { RawResponsible, Resource } from "../types";
import axios from "../lib/axios";
import { rawResponsibleToResponsible } from "../maps/rawResponsibleToResponsible";

interface Params {
  id: string;
  signal?: AbortSignal;
}

export const getResponsibleById = async ({ id, signal }: Params) => {
  const {
    data: { data: rawResponsible },
  } = await axios.get<Resource<RawResponsible>>(`/responsible/${id}`, {
    signal,
  });

  return rawResponsibleToResponsible(rawResponsible);
};
