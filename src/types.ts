export type Resource<T> = {
  data: T;
};

export type RawUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  cell_phone: string;
  password: string | null;
  password_confirmation: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: Date | null;
  emailVerifiedAtISO: string | null;
  cellPhone: string;
  password: string | null;
  passwordConfirmation: string | null;
  createdAt: Date | null;
  createdAtISO: string;
  updatedAt: Date | null;
  updatedAtISO: string | null;
  deletedAt: Date | null;
  deletedAtISO: string | null;
};
