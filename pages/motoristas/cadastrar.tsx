import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import { useDriverStoreMutation } from "../../src/hooks/mutations/useDriverStoreMutation";
import { ControlledTextField } from "../../src/components/ControlledTextField";
import CardHeader from "@mui/material/CardHeader";
import { driverCreateSchema } from "../../src/schemas";
import { DriverCreateForm } from "../../src/types";

export default function DriverCreate() {
  const { control, handleSubmit, setError } = useForm<DriverCreateForm>({
    resolver: yupResolver(driverCreateSchema),
  });
  const {
    mutate,
    isLoading: isStoringDriver,
    message,
  } = useDriverStoreMutation({ setError });

  const onSubmit = handleSubmit((driver) => mutate(driver));

  return (
    <>
      <Head>
        <title>SchoolGo - Cadastrar Motorista</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cadastrar Motorista" />
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
                        name="user.firstName"
                        label="Nome"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.lastName"
                        label="Sobrenome"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.email"
                        type="email"
                        label="E-mail"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.cellPhone"
                        type="tel"
                        label="Celular"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="license"
                        label="CNH"
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                      <LoadingButton
                        loading={isStoringDriver}
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
