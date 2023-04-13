import * as React from "react";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import { useEffect, useMemo, useState } from "react";
import parse from "autosuggest-highlight/parse";
import { mapsAutocomplete } from "../services/mapsAutocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { RawAddress } from "../types";
import { rawAddressToAddress } from "../maps/rawAddressToAddress";

type ControlledGoogleMapsProps<FieldValue extends FieldValues> = Pick<
  ControllerProps<FieldValue>,
  "name" | "control"
> &
  Pick<TextFieldProps, "label">;

export function ControlledGoogleMaps<FieldValue extends FieldValues>(
  props: ControlledGoogleMapsProps<FieldValue>
) {
  const { name, control, label } = props;
  const [value, setValue] = useState<RawAddress | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly RawAddress[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useMemo(
    () =>
      debounce(
        (
          input: string,
          callback: (results?: readonly RawAddress[]) => void
        ) => {
          setLoading(true);

          mapsAutocomplete({ input })
            .then(callback)
            .finally(() => setLoading(false));
        },
        750
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results?: readonly RawAddress[]) => {
      if (active) {
        let newOptions: readonly RawAddress[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          onChange={async (event: any, newValue: RawAddress | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);

            if (newValue) {
              field.onChange(await rawAddressToAddress(newValue));
            }
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
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
                    {loading ? (
                      <CircularProgress
                        size={20}
                        sx={{
                          position: "absolute",
                          right: "70px",
                          top: "calc(50% - 10px)",
                        }}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting?.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting?.main_text ?? "",
              matches.map((match: any) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item sx={{ display: "flex", width: 44 }}>
                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                  </Grid>
                  <Grid
                    item
                    sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting?.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      )}
    />
  );
}
