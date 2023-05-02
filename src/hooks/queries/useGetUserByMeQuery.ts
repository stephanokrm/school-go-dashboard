import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getUserByMe } from "../../services/getUserByMe";
import { useRouter } from "next/router";

export const useGetUserByMeQuery = () => {
  const router = useRouter();

  return useQuery(
    ["getUserByMe"],
    async ({ signal }) => {
      return getUserByMe({ signal });
    },
    {
      onError: async (error: AxiosError) => {
        if (error.response?.status !== 409) throw error;

        await router.push("/verify-email");
      },
    }
  );
};
