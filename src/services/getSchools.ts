import { RawSchool, Resource } from "../types";
import { rawSchoolToSchool } from "../maps/rawSchoolToSchool";
import axios from "../lib/axios";

interface Options {
  signal?: AbortSignal;
}

export const getSchools = async ({ signal }: Options = {}) => {
  const {
    data: { data: rawSchool },
  } = await axios.get<Resource<RawSchool[]>>(`/api/school`, { signal });

  return Promise.all(rawSchool.map(rawSchoolToSchool));
};
