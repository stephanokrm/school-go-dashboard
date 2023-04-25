import { RawStudent, Resource } from "../types";
import axios from "../axios";
import { rawStudentToStudent } from "../maps/rawStudentToStudent";

interface Params {
  id: string;
  authorization?: string;
  signal?: AbortSignal;
}

export const getStudentById = async ({ id, authorization, signal }: Params) => {
  const {
    data: { data: rawStudent },
  } = await axios(authorization).get<Resource<RawStudent>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/student/${id}`,
    { signal }
  );

  return rawStudentToStudent(rawStudent);
};
