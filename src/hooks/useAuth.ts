import { useEffect } from "react";
import { useGetUserByMeQuery } from "./queries/useGetUserByMeQuery";
import { useLogoutMutation } from "./mutations/useLogoutMutation";

export const useAuth = () => {
  const { data: user, isLoading, isFetching, error } = useGetUserByMeQuery();
  const { mutate: logout } = useLogoutMutation();

  const isSyncing = (isLoading || isFetching) && !error;

  useEffect(() => {
    if (isSyncing) return;

    if (error) {
      logout({});
    }
  }, [error, isSyncing, logout]);

  return {
    user,
    isAuthenticated: !!user && !error,
  };
};
