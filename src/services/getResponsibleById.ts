import { RawResponsible, Resource } from "../types";
import axios from "../axios";
import { rawResponsibleToResponsible } from "../maps/rawResponsibleToResponsible";

interface Params {
  id: string;
  authorization?: string;
  signal?: AbortSignal;
}

export const getResponsibleById = async ({
  id,
  authorization,
  signal,
}: Params) => {
  const {
    data: { data: rawResponsible },
  } = await axios(authorization).get<Resource<RawResponsible>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/responsible/${id}`,
    { signal }
  );

  return rawResponsibleToResponsible(rawResponsible);
};
