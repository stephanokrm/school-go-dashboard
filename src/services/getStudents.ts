import { RawStudent, Resource } from "../types";
import { rawStudentToStudent } from "../maps/rawStudentToStudent";
import axios from "../axios";

interface Params {
  morning?: boolean;
  afternoon?: boolean;
  night?: boolean;
}

interface Options {
  authorization?: string;
  params?: Params;
  signal?: AbortSignal;
}

export const getStudents = async ({
  authorization,
  params,
  signal,
}: Options = {}) => {
  const {
    data: { data: rawStudents },
  } = await axios(authorization).get<Resource<RawStudent[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/student`,
    { signal, params }
  );

  return Promise.all(rawStudents.map(rawStudentToStudent));
};
