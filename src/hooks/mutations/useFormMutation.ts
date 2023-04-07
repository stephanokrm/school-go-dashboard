import { useState } from "react";
import { AxiosError } from "axios";
import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

const snakeToCamel = <TVariables extends FieldValues>(
  str: FieldPath<TVariables>
) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    ) as FieldPath<TVariables>;

type ServiceError<TFieldValues extends FieldValues> = AxiosError<{
  message?: string;
  errors?: { [Property in FieldPath<TFieldValues>]?: string[] };
}>;

type UseFormMutationResult<TData, TError, TVariables, TContext> = {
  message?: string;
} & UseMutationResult<TData, TError, TVariables, TContext>;

type UseFormMutationOptions<
  TData,
  TVariables extends FieldValues,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, ServiceError<TVariables>, TVariables, TContext>,
  "mutationFn"
> & {
  setError?: UseFormSetError<TVariables>;
};
export const useFormMutation = <
  TData,
  TVariables extends FieldValues,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseFormMutationOptions<TData, TVariables, TContext>
): UseFormMutationResult<
  TData,
  ServiceError<TVariables>,
  TVariables,
  TContext
> => {
  const [message, setMessage] = useState<string>();

  const mutation = useMutation<
    TData,
    ServiceError<TVariables>,
    TVariables,
    TContext
  >(mutationFn, {
    ...options,
    onSuccess: (...args) => {
      setMessage(undefined);

      options?.onSuccess?.(...args);
    },
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
            options?.setError?.(snakeToCamel<TVariables>(field), {
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
