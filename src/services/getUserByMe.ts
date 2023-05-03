import { RawUser, Resource } from "../types";
import { rawUserToUser } from "../maps/rawUserToUser";
import axios from "../lib/axios";

interface Options {
  signal?: AbortSignal;
}

export const getUserByMe = async ({ signal }: Options = {}) => {
  const {
    data: { data: rawUser },
  } = await axios.get<Resource<RawUser>>("/api/user/me", {
    signal,
  });

  return rawUserToUser(rawUser);
};
