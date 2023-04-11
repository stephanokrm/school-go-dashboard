import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "../../services/getDrivers";

export const useGetDriversQuery = () => {
  return useQuery(["getDrivers"], async ({ signal }) => {
    return getDrivers({ signal });
  });
};
