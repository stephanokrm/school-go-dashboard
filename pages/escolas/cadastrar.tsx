import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledTextField } from "../../src/components/ControlledTextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledCheckbox } from "../../src/components/ControlledCheckbox";
import { ControlledTimePicker } from "../../src/components/ControlledTimePicker";
import { ControlledGoogleMaps } from "../../src/components/ControlledGoogleMaps";
import { useSchoolStoreMutation } from "../../src/hooks/mutations/useSchoolStoreMutation";
import { schoolCreateSchema } from "../../src/schemas";
import { FormLabel } from "@mui/material";
import { SchoolCreateForm } from "../../src/types";

export default function SchoolCreate() {
  const { control, handleSubmit, watch, getValues, setError } =
    useForm<SchoolCreateForm>({
      resolver: yupResolver(schoolCreateSchema),
    });

  const {
    mutate,
    isLoading: isStoringSchool,
    message,
  } = useSchoolStoreMutation({ setError });

  const onSubmit = handleSubmit((school) => mutate(school));

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
                <form onSubmit={onSubmit}>
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
                      <ControlledGoogleMaps
                        label="Endereço"
                        control={control}
                        name="address"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>Turnos</FormLabel>
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
                        loading={isStoringSchool}
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
