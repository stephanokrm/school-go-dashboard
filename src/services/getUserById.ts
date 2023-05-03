import { RawUser, Resource } from "../types";
import axios from "../lib/axios";
import { rawUserToUser } from "../maps/rawUserToUser";

interface Options {
  id: string;
  signal?: AbortSignal;
}

export const getUserById = async ({ id, signal }: Options) => {
  const {
    data: { data: rawUser },
  } = await axios.get<Resource<RawUser>>(`/api/user/${id}`, { signal });

  return rawUserToUser(rawUser);
};
