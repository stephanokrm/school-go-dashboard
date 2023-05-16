import { RawStudent, Resource } from "../types";
import { rawStudentToStudent } from "../maps/rawStudentToStudent";
import axios from "../lib/axios";

interface Params {
  responsible?: boolean;
}

interface Options {
  params?: Params;
  signal?: AbortSignal;
}

export const getStudents = async ({ params, signal }: Options = {}) => {
  const {
    data: { data: rawStudents },
  } = await axios.get<Resource<RawStudent[]>>(`/api/student`, {
    signal,
    params,
  });

  return Promise.all(rawStudents.map(rawStudentToStudent));
};
