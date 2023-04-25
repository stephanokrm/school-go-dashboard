import { RawRole, Role } from "../types";

export const rawRoleToRole = async (rawRole: RawRole): Promise<Role> => ({
  id: rawRole.id,
  role: rawRole.role,
});
