import { RawResponsible, Resource } from "../types";
import { rawResponsibleToResponsible } from "../maps/rawResponsibleToResponsible";
import axios from "../axios";

interface Params {
  authorization?: string;
  signal?: AbortSignal;
}

export const getResponsibles = async ({
  authorization,
  signal,
}: Params = {}) => {
  const {
    data: { data: rawResponsible },
  } = await axios(authorization).get<Resource<RawResponsible[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/responsible`,
    { signal }
  );

  return Promise.all(rawResponsible.map(rawResponsibleToResponsible));
};
