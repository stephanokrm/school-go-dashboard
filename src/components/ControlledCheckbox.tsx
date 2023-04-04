import {
    Controller,
    ControllerProps,
    FieldValues,
} from 'react-hook-form';
import Checkbox, {CheckboxProps} from "@mui/material/Checkbox";
import {FormControlLabel, FormGroup} from "@mui/material";
import * as React from "react";

type ControlledTextFieldProps<FieldValue extends FieldValues> =
    Omit<CheckboxProps, 'name'>
    & Pick<ControllerProps<FieldValue>, 'name' | 'control'>
    & {
    transform?: (value: string) => unknown,
    label: string,
};

export function ControlledCheckbox<FieldValue extends FieldValues>(props: ControlledTextFieldProps<FieldValue>) {
    const {
        name,
        control,
        label,
        transform = (value) => value,
        ...rest
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({field, formState}) => (
                <FormGroup>
                    <FormControlLabel control={(
                        <Checkbox {...field} {...rest} />
                    )} label={label}/>
                </FormGroup>
            )}
        />
    );
}