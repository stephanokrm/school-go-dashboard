import { RawStudent, Resource } from "../types";
import { rawStudentToStudent } from "../maps/rawStudentToStudent";
import axios from "../axios";

interface Params {
  authorization?: string;
  signal?: AbortSignal;
}

export const getStudents = async ({ authorization, signal }: Params = {}) => {
  const {
    data: { data: rawStudents },
  } = await axios(authorization).get<Resource<RawStudent[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/student`,
    { signal }
  );

  return Promise.all(rawStudents.map(rawStudentToStudent));
};
