import React from "react";
import {Controller, FieldValues, ControllerProps} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {TextFieldProps} from '@mui/material/TextField/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import {AutocompleteProps} from '@mui/material/Autocomplete/Autocomplete';
import {AutocompleteValue} from "@mui/base/useAutocomplete/useAutocomplete";

type ControlledDatePickerProps<Option, FieldValue extends FieldValues,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined> =
    Pick<ControllerProps<FieldValue>, 'name' | 'control'>
    & Omit<AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>, 'onChange' | 'renderInput'>
    & Pick<TextFieldProps, 'label'>
    & {
    onChange?: (value: AutocompleteValue<Option, Multiple, DisableClearable, FreeSolo>) => void | Promise<void>
};

export function ControlledAutocomplete<Option, FieldValue extends FieldValues, Multiple extends boolean>(props: ControlledDatePickerProps<Option, FieldValue, Multiple>) {
    const {
        name,
        control,
        label,
        onChange,
        loading,
        ...rest
    } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => (
                <Autocomplete
                    {...rest}
                    {...field}
                    value={field.value}
                    onChange={async (event, value) => {
                        field.onChange(value);

                        await onChange?.(value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            label={label}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            variant="filled"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress size={20} sx={{
                                            position: 'absolute',
                                            right: '70px',
                                            top: 'calc(50% - 10px)',
                                        }}/> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )}
                />
            )}
        />
    );
}