import { RawUser, Resource } from "../types";
import { rawUserToUser } from "../maps/rawUserToUser";
import axios from "../axios";

type Params = {
  signal?: AbortSignal;
};

export const getUserByMe = async ({ signal }: Params) => {
  const {
    data: { data: rawUser },
  } = await axios().get<Resource<RawUser>>(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/me`,
    { signal }
  );

  return rawUserToUser(rawUser);
};
