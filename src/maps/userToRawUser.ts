import { RawUser, User } from "../types";
import { parsePhoneNumber } from "libphonenumber-js";

export const userToRawUser = async (user: User): Promise<RawUser> => ({
  id: user.id,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  email_verified_at: user.emailVerifiedAtISO,
  cell_phone: parsePhoneNumber(user.cellPhone, "BR").number,
  password: user.password,
  password_confirmation: user.passwordConfirmation,
  created_at: user.createdAtISO,
  updated_at: user.updatedAtISO,
  deleted_at: user.deletedAtISO,
});
