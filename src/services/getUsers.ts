import { RawUser, Resource } from "../types";
import { rawUserToUser } from "../maps/rawUserToUser";
import axios from "../axios";

interface Params {
  authorization?: string;
  signal?: AbortSignal;
}

export const getUsers = async ({ authorization, signal }: Params = {}) => {
  const {
    data: { data: rawUser },
  } = await axios(authorization).get<Resource<RawUser[]>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user`,
    { signal }
  );

  return Promise.all(rawUser.map(rawUserToUser));
};
