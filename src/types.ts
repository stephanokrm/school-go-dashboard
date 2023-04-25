// COMMON

import * as yup from "yup";
import {
  itinerariesCreateSchema,
  driversCreateSchema,
  responsibleCreateSchema,
  studentCreateSchema,
  studentEditSchema,
} from "./schemas";

export type Resource<T> = {
  data: T;
};

// MODELS

export type RawRole = {
  id: number;
  role: string;
};

export type Role = {
  id: number;
  role: string;
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
  roles: RawRole[];
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
  roles?: Role[];
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

export type RawResponsible = {
  id: number;
  user: RawUser;
};

export type Responsible = {
  id: number;
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
  morningEntryTime?: Date;
  morningDepartureTime?: Date;
  afternoonEntryTime?: Date;
  afternoonDepartureTime?: Date;
  nightEntryTime?: Date;
  nightDepartureTime?: Date;
  address: Address;
};

export type RawStudent = {
  id: number;
  first_name: string;
  last_name: string;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  goes: boolean;
  return: boolean;
  address: RawAddress;
  responsible: RawResponsible;
  school: RawSchool;
};

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  goes: boolean;
  return: boolean;
  address: Address;
  responsible: Responsible;
  school: School;
};

// FIELD VALUES

export type ItinerariesCreateForm = yup.InferType<
  typeof itinerariesCreateSchema
>;

export type DriverCreateForm = yup.InferType<typeof driversCreateSchema>;

export type ResponsibleCreateForm = yup.InferType<
  typeof responsibleCreateSchema
>;

export type StudentCreateForm = yup.InferType<typeof studentCreateSchema>;

export type StudentEditForm = yup.InferType<typeof studentEditSchema>;
