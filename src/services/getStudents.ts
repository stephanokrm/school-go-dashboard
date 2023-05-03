import { RawStudent, Resource } from "../types";
import { rawStudentToStudent } from "../maps/rawStudentToStudent";
import axios from "../lib/axios";

interface Params {
  morning?: boolean;
  afternoon?: boolean;
  night?: boolean;
}

interface Options {
  params?: Params;
  signal?: AbortSignal;
}

export const getStudents = async ({ params, signal }: Options = {}) => {
  const {
    data: { data: rawStudents },
  } = await axios.get<Resource<RawStudent[]>>(`/student`, {
    signal,
    params,
  });

  return Promise.all(rawStudents.map(rawStudentToStudent));
};
