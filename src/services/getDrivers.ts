import { RawDriver, Resource } from "../types";
import { rawDriverToDriver } from "../maps/rawDriverToDriver";
import axios from "../axios";

interface Params {
  authorization?: string;
  signal?: AbortSignal;
}

export const getDrivers = async ({ authorization, signal }: Params = {}) => {
  const {
    data: { data: rawDriver },
  } = await axios(authorization).get<Resource<RawDriver[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/driver`,
    { signal }
  );

  return Promise.all(rawDriver.map(rawDriverToDriver));
};
