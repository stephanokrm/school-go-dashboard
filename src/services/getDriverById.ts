import { RawDriver, Resource } from "../types";
import axios from "../lib/axios";
import { rawDriverToDriver } from "../maps/rawDriverToDriver";

interface Options {
  id: string;
  signal?: AbortSignal;
}

export const getDriverById = async ({ id, signal }: Options) => {
  const {
    data: { data: rawDriver },
  } = await axios.get<Resource<RawDriver>>(`/driver/${id}`, { signal });

  return rawDriverToDriver(rawDriver);
};
