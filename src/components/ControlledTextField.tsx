import { ChangeEvent } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";

type ControlledTextFieldProps<FieldValue extends FieldValues> = Omit<
  TextFieldProps,
  "name"
> &
  Pick<ControllerProps<FieldValue>, "name" | "control"> & {
    transform?: (value: string) => unknown;
    loading?: boolean;
  };

export function ControlledTextField<FieldValue extends FieldValues>(
  props: ControlledTextFieldProps<FieldValue>
) {
  const {
    name,
    control,
    transform = (value) => value,
    loading = false,
    ...rest
  } = props;

  return loading ? (
    <Skeleton variant="rectangular" width="100%" />
  ) : (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="filled"
          onChange={(
            changeEvent: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            field.onChange({
              ...changeEvent,
              target: {
                ...changeEvent.target,
                value: transform(changeEvent.target.value),
              },
            });
          }}
        />
      )}
    />
  );
}
