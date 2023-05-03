import { RawSchool, Resource } from "../types";
import axios from "../lib/axios";
import { rawSchoolToSchool } from "../maps/rawSchoolToSchool";

interface Options {
  id: string;
  signal?: AbortSignal;
}

export const getSchoolById = async ({ id, signal }: Options) => {
  const {
    data: { data: rawSchool },
  } = await axios.get<Resource<RawSchool>>(`/school/${id}`, { signal });

  return rawSchoolToSchool(rawSchool);
};
