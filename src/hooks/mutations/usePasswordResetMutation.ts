import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import axios from "../../lib/axios";
import { useFormMutation } from "./useFormMutation";
import { useCsrfQuery } from "../queries/useCsrfQuery";
import { PasswordResetForm } from "../../types";

type Response = {};

type SuccessResponse = AxiosResponse<Response>;

export const usePasswordResetMutation = () => {
  const router = useRouter();

  useCsrfQuery();

  return useFormMutation<SuccessResponse, PasswordResetForm>(
    async (reset) => {
      return axios.post<Response, SuccessResponse>("/reset-password", {
        email: reset.email,
        token: reset.token,
        password: reset.password,
        password_confirmation: reset.passwordConfirmation,
      });
    },
    {
      onSuccess: async () => {
        await router.push("/login");
      },
    }
  );
};
