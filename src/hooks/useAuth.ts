import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetUserByMeQuery } from "./queries/useGetUserByMeQuery";
import { useLogoutMutation } from "./mutations/useLogoutMutation";

interface UseAuth {
  middleware?: "auth" | "guest";
  redirectIfAuthenticated?: string;
}
export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuth = {}) => {
  const router = useRouter();

  const { data: user, isLoading, isFetching } = useGetUserByMeQuery();
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    if (
      middleware === "guest" &&
      redirectIfAuthenticated &&
      user &&
      !isLoading &&
      !isFetching
    )
      router.push(redirectIfAuthenticated);

    if (
      router.pathname === "/verify-email" &&
      user?.emailVerifiedAt &&
      redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && !user && !isLoading && !isFetching) logout({});
  }, [
    user,
    logout,
    middleware,
    redirectIfAuthenticated,
    router,
    isLoading,
    isFetching,
  ]);

  return {
    user,
  };
};
