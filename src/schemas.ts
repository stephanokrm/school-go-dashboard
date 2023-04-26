import * as yup from "yup";

export const usersCreateSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    cellPhone: yup.string().required(),
  })
  .required();

export const driversCreateSchema = yup
  .object({
    user: usersCreateSchema,
    license: yup.string().required(),
  })
  .required();

export const responsibleCreateSchema = yup
  .object({
    user: usersCreateSchema,
  })
  .required();

export const addressesCreateSchema = yup
  .object({
    description: yup.string().required(),
    place: yup.string().required(),
  })
  .required();

export const schoolsCreateSchema = yup
  .object({
    name: yup.string().required(),
    address: addressesCreateSchema,
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

export const studentCreateSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: addressesCreateSchema,
    school: schoolsCreateSchema,
    responsible: responsibleCreateSchema,
    goes: yup.boolean(),
    return: yup.boolean(),
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
  })
  .required();

export const itinerariesCreateSchema = yup
  .object({
    driver: driversCreateSchema,
    school: schoolsCreateSchema,
    students: yup.array().of(studentCreateSchema),
    direction: yup.boolean(),
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
    address: addressesCreateSchema,
    school: schoolsCreateSchema,
    responsible: responsibleCreateSchema,
    goes: yup.boolean(),
    return: yup.boolean(),
    morning: yup.boolean(),
    afternoon: yup.boolean(),
    night: yup.boolean(),
  })
  .required();

export const usersEditSchema = yup
  .object({
    id: yup.number().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    cellPhone: yup.string().required(),
  })
  .required();
