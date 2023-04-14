import { RawSchool, Resource } from "../types";
import axios from "../axios";
import { rawSchoolToSchool } from "../maps/rawSchoolToSchool";

interface Params {
  id: string;
  authorization?: string;
  signal?: AbortSignal;
}

export const getSchoolById = async ({ id, authorization, signal }: Params) => {
  const {
    data: { data: rawSchool },
  } = await axios(authorization).get<Resource<RawSchool>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/school/${id}`,
    { signal }
  );

  return rawSchoolToSchool(rawSchool);
};
