import { useEffect, useState } from "react";
import { useGetUserByMeQuery } from "./queries/useGetUserByMeQuery";
import { useLogoutMutation } from "./mutations/useLogoutMutation";
import { useRouter } from "next/router";

export const useAuth = () => {
  const { pathname } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data: user, isLoading, isFetching, error } = useGetUserByMeQuery();
  const { mutate: logout } = useLogoutMutation();

  const status = error?.response?.status ?? 200;
  const isSyncing = (isLoading || isFetching) && !error;

  useEffect(() => {
    setIsAuthenticated(!!user && !error);
  }, [user, error]);

  useEffect(() => {
    if (isSyncing) return;

    if (pathname === "/login") return;

    if (![401, 403].includes(status)) return;

    logout({});
  }, [status, pathname, error, isSyncing, logout]);

  return {
    user,
    isAuthenticated,
  };
};
