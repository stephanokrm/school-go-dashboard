import { useState } from "react";
import { AxiosError } from "axios";
import { FieldPath, FieldValues, useForm } from "react-hook-form";
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

type ServiceError<TFieldValues extends FieldValues> = AxiosError<{
  message?: string;
  errors?: { [Property in FieldPath<TFieldValues>]?: string[] };
}>;

type UseFormMutationResult<TData, TError, TVariables, TContext> = {
  message?: string;
} & UseMutationResult<TData, TError, TVariables, TContext>;

export const useFormMutation = <
  TData,
  TVariables extends FieldValues,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, ServiceError<TVariables>, TVariables, TContext>,
    "mutationFn"
  >
): UseFormMutationResult<
  TData,
  ServiceError<TVariables>,
  TVariables,
  TContext
> => {
  const [message, setMessage] = useState<string>();
  const { setError } = useForm<TVariables>();

  const mutation = useMutation<
    TData,
    ServiceError<TVariables>,
    TVariables,
    TContext
  >(mutationFn, {
    ...options,
    onError: async (error) => {
      if (error.response?.data.message) {
        setMessage(error.response.data.message);
      } else if (error.message) {
        setMessage(error.message);
      }

      if (error.response?.data.errors) {
        (
          Object.keys(error.response.data.errors) as Array<
            FieldPath<TVariables>
          >
        )
          .filter((field) => {
            const errors = error.response?.data?.errors?.[field];

            return errors && errors.length > 0;
          })
          .forEach((field) => {
            setError?.(field, {
              message: error.response?.data?.errors?.[field]?.[0],
            });
          });
      }
    },
  });

  return {
    ...mutation,
    message,
  };
};
