import { RawUser, User } from "../types";
import { parsePhoneNumber } from "libphonenumber-js";
import { rawRoleToRole } from "./rawRoleToRole";

export const rawUserToUser = async (rawUser: RawUser): Promise<User> => ({
  id: rawUser.id,
  firstName: rawUser.first_name,
  lastName: rawUser.last_name,
  email: rawUser.email ?? null,
  emailVerifiedAt: null,
  emailVerifiedAtISO: rawUser.email_verified_at ?? null,
  cellPhone: parsePhoneNumber(rawUser.cell_phone, "BR").formatNational(),
  password: rawUser.password ?? null,
  passwordConfirmation: rawUser.password_confirmation ?? null,
  createdAt: null,
  createdAtISO: rawUser.created_at ?? null,
  updatedAt: null,
  updatedAtISO: rawUser.updated_at ?? null,
  deletedAt: null,
  deletedAtISO: rawUser.deleted_at ?? null,
  roles: await Promise.all(rawUser.roles.map(rawRoleToRole)),
});
