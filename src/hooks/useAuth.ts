import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetUserByMeQuery } from "./queries/useGetUserByMeQuery";
import { useLogoutMutation } from "./mutations/useLogoutMutation";

interface UseAuth {
  middleware?: "auth" | "guest";
}
export const useAuth = ({ middleware }: UseAuth = {}) => {
  const router = useRouter();
  const { data: user, isLoading, isFetching, error } = useGetUserByMeQuery();
  const { mutate: logout } = useLogoutMutation();

  const isSyncing = (isLoading || isFetching) && !error;
  const isAuthenticated = !!user && !error;

  useEffect(() => {
    if (isSyncing) return;

    if (middleware === "guest" && isAuthenticated) {
      router.push("/trips");
    }

    if (middleware === "auth" && !isAuthenticated) {
      logout({});
    }
  }, [isAuthenticated, logout, middleware, router, isSyncing]);

  return {
    user,
  };
};
