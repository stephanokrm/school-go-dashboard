import { RawSchool, Resource } from "../types";
import { rawSchoolToSchool } from "../maps/rawSchoolToSchool";
import axios from "../axios";

interface Params {
  authorization?: string;
  signal?: AbortSignal;
}

export const getSchools = async ({ authorization, signal }: Params = {}) => {
  const {
    data: { data: rawSchool },
  } = await axios(authorization).get<Resource<RawSchool[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/school`,
    { signal }
  );

  return Promise.all(rawSchool.map(rawSchoolToSchool));
};
