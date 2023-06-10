import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserByMe } from "@/services/getUserByMe";

export const useGetUserByMeQuery = () => {
  const router = useRouter();

  return useQuery(
    ["getUserByMe"],
    async ({ signal }) => {
      return getUserByMe({ signal });
    },
    {
      retry: false,
      retryOnMount: false,
      onError: async (error: AxiosError) => {
        if (error.response?.status !== 409) throw error;

        await router.push("/verify-email");
      },
    }
  );
};
