import * as yup from "yup";
import { pl } from "yup-locales";

yup.setLocale(pl);

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const passwordResetFormSchema = yup
  .object({
    email: yup.string().email().required(),
    token: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().required(),
  })
  .required();

export const userCreateSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    cellPhone: yup.string().required(),
  })
  .required();

export const userEditSchema = yup
  .object({
    id: yup.number().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    cellPhone: yup.string().required(),
  })
  .required();

export const driverCreateSchema = yup
  .object({
    user: userCreateSchema,
    license: yup.string().required(),
  })
  .required();

export const driverEditSchema = yup
  .object({
    id: yup.number().required(),
    license: yup.string().required(),
    user: userEditSchema,
  })
  .required();

export const addressCreateSchema = yup
  .object({
    description: yup.string().required(),
    place: yup.string().required(),
  })
  .required();

export const addressEditSchema = yup
  .object({
    description: yup.string().required(),
    place: yup.string().required(),
  })
  .required();

export const schoolCreateSchema = yup
  .object({
    name: yup.string().required(),
    address: addressCreateSchema,
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
    morningEntryTime: yup.date().when("morning", {
      is: true,
      then: (schema) => schema.required(),
    }),
    morningDepartureTime: yup
      .date()
      .when("morning", {
        is: true,
        then: (schema) => schema.required(),
      })
      .when("morningEntryTime", ([morningEntryTime], schema) => {
        return morningEntryTime ? schema.min(morningEntryTime) : schema;
      }),
    afternoonEntryTime: yup.date().when("afternoon", {
      is: true,
      then: (schema) => schema.required(),
    }),
    afternoonDepartureTime: yup.date().when("afternoon", {
      is: true,
      then: (schema) => schema.required(),
    }),
    nightEntryTime: yup.date().when("night", {
      is: true,
      then: (schema) => schema.required(),
    }),
    nightDepartureTime: yup.date().when("night", {
      is: true,
      then: (schema) => schema.required(),
    }),
  })
  .required();

export const schoolEditSchema = yup
  .object({
    id: yup.number().required(),
    name: yup.string().required(),
    address: addressEditSchema,
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
    morningEntryTime: yup.date().when("morning", {
      is: true,
      then: (schema) => schema.required(),
    }),
    morningDepartureTime: yup
      .date()
      .when("morning", {
        is: true,
        then: (schema) => schema.required(),
      })
      .when("morningEntryTime", ([morningEntryTime], schema) => {
        return morningEntryTime ? schema.min(morningEntryTime) : schema;
      }),
    afternoonEntryTime: yup.date().when("afternoon", {
      is: true,
      then: (schema) => schema.required(),
    }),
    afternoonDepartureTime: yup.date().when("afternoon", {
      is: true,
      then: (schema) => schema.required(),
    }),
    nightEntryTime: yup.date().when("night", {
      is: true,
      then: (schema) => schema.required(),
    }),
    nightDepartureTime: yup.date().when("night", {
      is: true,
      then: (schema) => schema.required(),
    }),
  })
  .required();

export const responsibleCreateSchema = yup
  .object({
    user: userCreateSchema,
  })
  .required();

export const responsibleEditSchema = yup
  .object({
    id: yup.number().required(),
    user: userEditSchema,
  })
  .required();

export const studentCreateSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: addressCreateSchema,
    school: schoolCreateSchema,
    responsible: responsibleCreateSchema,
    goes: yup.boolean(),
    return: yup.boolean(),
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
  })
  .required();

export const studentEditSchema = yup
  .object({
    id: yup.number().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: addressCreateSchema,
    school: schoolCreateSchema,
    responsible: responsibleCreateSchema,
    goes: yup.boolean(),
    return: yup.boolean(),
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
  })
  .required();

export const itineraryCreateSchema = yup
  .object({
    address: addressCreateSchema,
    driver: driverCreateSchema,
    school: schoolCreateSchema,
    students: yup.array().of(studentCreateSchema),
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
    monday: yup.boolean(),
    tuesday: yup.boolean(),
    wednesday: yup.boolean(),
    thursday: yup.boolean(),
    friday: yup.boolean(),
  })
  .required();

export const itineraryEditSchema = yup
  .object({
    id: yup.number().required(),
    address: addressEditSchema,
    driver: driverEditSchema,
    school: schoolEditSchema,
    students: yup.array().of(studentEditSchema),
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
    monday: yup.boolean(),
    tuesday: yup.boolean(),
    wednesday: yup.boolean(),
    thursday: yup.boolean(),
    friday: yup.boolean(),
  })
  .required();
