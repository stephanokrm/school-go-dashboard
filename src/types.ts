export type Resource<T> = {
  data: T;
};

export type RawUser = {
  id: number;
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
  id: number;
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

export type RawDriver = {
  id: number;
  license: string;
  user: RawUser;
};

export type Driver = {
  id: number;
  license: string;
  user: User;
};

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface RawAddress {
  description: string;
  place_id: string;
  structured_formatting?: StructuredFormatting;
}

export type Address = {
  id?: number;
  description: string;
  place: string;
};

export type RawSchool = {
  id: number;
  name: string;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  morning_entry_time?: string;
  morning_departure_time?: string;
  afternoon_entry_time?: string;
  afternoon_departure_time?: string;
  night_entry_time?: string;
  night_departure_time?: string;
  address: RawAddress;
};

export type School = {
  id: number;
  name: string;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  morningEntryTime?: string;
  morningDepartureTime?: string;
  afternoonEntryTime?: string;
  afternoonDepartureTime?: string;
  nightEntryTime?: string;
  nightDepartureTime?: string;
  address: Address;
};
