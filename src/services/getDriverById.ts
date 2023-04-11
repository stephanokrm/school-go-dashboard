import { RawDriver, Resource } from "../types";
import axios from "../axios";
import { rawDriverToDriver } from "../maps/rawDriverToDriver";

interface Params {
  id: string;
  authorization?: string;
  signal?: AbortSignal;
}

export const getDriverById = async ({ id, authorization, signal }: Params) => {
  const {
    data: { data: rawDriver },
  } = await axios(authorization).get<Resource<RawDriver>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/driver/${id}`,
    { signal }
  );

  return rawDriverToDriver(rawDriver);
};
