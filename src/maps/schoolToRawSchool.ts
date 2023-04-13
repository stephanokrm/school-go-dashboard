import { RawSchool, School } from "../types";
import { addressToRawAddress } from "./addressToRawAddress";

export const schoolToRawSchool = async (
  school: School
): Promise<RawSchool> => ({
  id: school.id,
  name: school.name,
  morning: school.morning,
  afternoon: school.afternoon,
  night: school.night,
  morning_entry_time: school.morningEntryTime,
  morning_departure_time: school.morningDepartureTime,
  afternoon_entry_time: school.afternoonEntryTime,
  afternoon_departure_time: school.afternoonDepartureTime,
  night_entry_time: school.nightEntryTime,
  night_departure_time: school.nightDepartureTime,
  address: await addressToRawAddress(school.address),
});
