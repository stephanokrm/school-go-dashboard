import { RawSchool, School } from "../types";
import { rawAddressToAddress } from "./rawAddressToAddress";

export const rawSchoolToSchool = async (
  rawSchool: RawSchool
): Promise<School> => ({
  id: rawSchool.id,
  name: rawSchool.name,
  morning: rawSchool.morning,
  afternoon: rawSchool.afternoon,
  night: rawSchool.night,
  morningEntryTime: rawSchool.morning_entry_time,
  morningDepartureTime: rawSchool.morning_departure_time,
  afternoonEntryTime: rawSchool.afternoon_entry_time,
  afternoonDepartureTime: rawSchool.afternoon_departure_time,
  nightEntryTime: rawSchool.night_entry_time,
  nightDepartureTime: rawSchool.night_departure_time,
  address: await rawAddressToAddress(rawSchool.address),
});
