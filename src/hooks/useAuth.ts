import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetUserByMeQuery } from "./queries/useGetUserByMeQuery";
import { useLogoutMutation } from "./mutations/useLogoutMutation";

interface UseAuth {
  middleware?: "auth" | "guest";
}
export const useAuth = ({ middleware }: UseAuth = {}) => {
  const router = useRouter();

  const { data: user, isLoading, isFetching } = useGetUserByMeQuery();
  const { mutate: logout } = useLogoutMutation();

  const isSyncing = isLoading || isFetching;

  useEffect(() => {
    if (middleware === "guest" && user && !isSyncing) {
      router.push("/trips");
    }

    if (middleware === "auth" && !user && !isSyncing) {
      logout({});
    }
  }, [user, logout, middleware, router, isSyncing]);

  return {
    user,
  };
};
