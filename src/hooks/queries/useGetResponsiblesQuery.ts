import { useQuery } from "@tanstack/react-query";
import { getResponsibles } from "../../services/getResponsibles";

export const useGetResponsiblesQuery = () => {
  return useQuery(["getResponsibles"], async ({ signal }) => {
    return getResponsibles({ signal });
  });
};
