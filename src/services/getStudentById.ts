import { RawStudent, Resource } from "../types";
import axios from "../lib/axios";
import { rawStudentToStudent } from "../maps/rawStudentToStudent";

interface Options {
  id: string;
  signal?: AbortSignal;
}

export const getStudentById = async ({ id, signal }: Options) => {
  const {
    data: { data: rawStudent },
  } = await axios.get<Resource<RawStudent>>(`/api/student/${id}`, { signal });

  return rawStudentToStudent(rawStudent);
};
