import { RawUser, Resource } from "../types";
import axios from "../axios";
import { rawUserToUser } from "../maps/rawUserToUser";

interface Params {
  id: string;
  authorization?: string;
  signal?: AbortSignal;
}

export const getUserById = async ({ id, authorization, signal }: Params) => {
  const {
    data: { data: rawUser },
  } = await axios(authorization).get<Resource<RawUser>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/${id}`,
    { signal }
  );

  return rawUserToUser(rawUser);
};
