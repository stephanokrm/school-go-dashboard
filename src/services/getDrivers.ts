import { RawDriver, Resource } from "../types";
import { rawDriverToDriver } from "../maps/rawDriverToDriver";
import axios from "../lib/axios";

interface Options {
  signal?: AbortSignal;
}

export const getDrivers = async ({ signal }: Options = {}) => {
  const {
    data: { data: rawDriver },
  } = await axios.get<Resource<RawDriver[]>>(`/api/driver`, { signal });

  return Promise.all(rawDriver.map(rawDriverToDriver));
};
