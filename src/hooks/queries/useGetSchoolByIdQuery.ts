import { useQuery } from "@tanstack/react-query";
import { getSchoolById } from "../../services/getSchoolById";

export const useGetSchoolByIdQuery = (id?: string) => {
  return useQuery(
    ["getSchoolById", id],
    async ({ signal }) => {
      return getSchoolById({ id: id as string, signal });
    },
    {
      enabled: !!id,
    }
  );
};
