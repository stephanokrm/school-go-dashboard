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

  const { data: user } = useGetUserByMeQuery();
  const { mutate: logout } = useLogoutMutation();

  // const forgotPassword = async ({ setErrors, setStatus, email }) => {
  //   await csrf();
  //
  //   setErrors([]);
  //   setStatus(null);
  //
  //   axios
  //     .post("/forgot-password", { email })
  //     .then((response) => setStatus(response.data.status))
  //     .catch((error) => {
  //       if (error.response.status !== 422) throw error;
  //
  //       setErrors(error.response.data.errors);
  //     });
  // };
  //
  // const resetPassword = async ({ setErrors, setStatus, ...props }) => {
  //   await csrf();
  //
  //   setErrors([]);
  //   setStatus(null);
  //
  //   axios
  //     .post("/reset-password", { token: router.query.token, ...props })
  //     .then((response) =>
  //       router.push("/login?reset=" + btoa(response.data.status))
  //     )
  //     .catch((error) => {
  //       if (error.response.status !== 422) throw error;
  //
  //       setErrors(error.response.data.errors);
  //     });
  // };
  //
  // const resendEmailVerification = ({ setStatus }) => {
  //   axios
  //     .post("/email/verification-notification")
  //     .then((response) => setStatus(response.data.status));
  // };
  //
  // const logout = async () => {
  //   if (!error) {
  //     await axios.post("/logout").then(() => refetch());
  //   }
  //
  //   window.location.pathname = "/login";
  // };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (
      router.pathname === "/verify-email" &&
      user?.emailVerifiedAt &&
      redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && !user) logout({});
  }, [user, logout, middleware, redirectIfAuthenticated, router]);

  return {
    user,
    // login,
    // forgotPassword,
    // resetPassword,
    // resendEmailVerification,
    // logout,
  };
};
