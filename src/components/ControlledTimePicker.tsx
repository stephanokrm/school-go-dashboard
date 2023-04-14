import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { TimePickerProps, MobileTimePicker } from "@mui/x-date-pickers";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type ControlledTextFieldProps<FieldValue extends FieldValues> = Omit<
  TextFieldProps,
  "name"
> &
  Pick<ControllerProps<FieldValue>, "name" | "control"> &
  Pick<TimePickerProps<Date>, "maxTime" | "minTime">;

export function ControlledTimePicker<FieldValue extends FieldValues>(
  props: ControlledTextFieldProps<FieldValue>
) {
  const { name, control, maxTime, minTime, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MobileTimePicker
          {...field}
          maxTime={maxTime}
          minTime={minTime}
          slots={{
            textField: (textFieldProps) => (
              <TextField
                {...textFieldProps}
                {...rest}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                variant="filled"
              />
            ),
          }}
        />
      )}
    />
  );
}
