import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ControlledTextField } from "../../src/components/ControlledTextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledAutocomplete } from "../../src/components/ControlledAutocomplete";
import { ControlledCheckbox } from "../../src/components/ControlledCheckbox";
import { ControlledTimePicker } from "../../src/components/ControlledTimePicker";

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    morning: yup.boolean().required(),
    afternoon: yup.boolean().required(),
    night: yup.boolean().required(),
    morningEntryTime: yup.date().when("morning", {
      is: true,
      then: (schema) => schema.required(),
    }),
    morningDepartureTime: yup
      .date()
      .when("morning", {
        is: true,
        then: (schema) => schema.required(),
      })
      .when("morningEntryTime", ([morningEntryTime], schema) => {
        return morningEntryTime ? schema.min(morningEntryTime) : schema;
      }),
    afternoonEntryTime: yup.date().when("afternoon", {
      is: true,
      then: (schema) => schema.required(),
    }),
    afternoonDepartureTime: yup.date().when("afternoon", {
      is: true,
      then: (schema) => schema.required(),
    }),
    nightEntryTime: yup.date().when("night", {
      is: true,
      then: (schema) => schema.required(),
    }),
    nightDepartureTime: yup.date().when("night", {
      is: true,
      then: (schema) => schema.required(),
    }),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SchoolsCreate() {
  const { control, handleSubmit, watch, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  const message = "S";
  const isLoading = false;

  console.log({ formState });

  return (
    <>
      <Head>
        <title>SchoolGo - Cadastrar Escola</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cadastrar Escola" />
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    {message && (
                      <Grid item xs={12}>
                        <Alert severity="error">{message}</Alert>
                      </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="name"
                        label="Nome"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledAutocomplete
                        loading
                        options={[]}
                        control={control}
                        name="address"
                        label="Endereço"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledCheckbox
                        name="morning"
                        label="Manhã"
                        control={control}
                      />
                    </Grid>
                    {watch("morning") && (
                      <>
                        <Grid item xs={12} md={6}>
                          <ControlledTimePicker
                            name="morningEntryTime"
                            label="Horário de Entrada da Manhã"
                            maxTime={watch("morningDepartureTime")}
                            control={control}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ControlledTimePicker
                            name="morningDepartureTime"
                            label="Horário de Saída da Manhã"
                            minTime={watch("morningEntryTime")}
                            control={control}
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <ControlledCheckbox
                        name="afternoon"
                        label="Tarde"
                        control={control}
                      />
                    </Grid>
                    {watch("afternoon") && (
                      <>
                        <Grid item xs={12} md={6}>
                          <ControlledTimePicker
                            name="afternoonEntryTime"
                            label="Horário de Entrada da Tarde"
                            minTime={watch("morningDepartureTime")}
                            maxTime={watch("afternoonDepartureTime")}
                            control={control}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ControlledTimePicker
                            name="afternoonDepartureTime"
                            label="Horário de Saída da Tarde"
                            minTime={watch("afternoonEntryTime")}
                            control={control}
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <ControlledCheckbox
                        name="night"
                        label="Noite"
                        control={control}
                      />
                    </Grid>
                    {watch("night") && (
                      <>
                        <Grid item xs={12} md={6}>
                          <ControlledTimePicker
                            name="nightEntryTime"
                            label="Horário de Entrada da Noite"
                            minTime={watch("afternoonDepartureTime")}
                            maxTime={watch("nightDepartureTime")}
                            control={control}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ControlledTimePicker
                            name="nightDepartureTime"
                            label="Horário de Saída da Noite"
                            minTime={watch("nightEntryTime")}
                            control={control}
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} display="flex" justifyContent="end">
                      <LoadingButton
                        loading={isLoading}
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Cadastrar
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
