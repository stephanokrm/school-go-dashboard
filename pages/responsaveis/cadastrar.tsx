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
import { ControlledTextField } from "@/components/ControlledTextField";
import CardHeader from "@mui/material/CardHeader";
import { responsibleCreateSchema } from "@/schemas";
import { ResponsibleCreateForm } from "@/types";
import { useResponsibleStoreMutation } from "@/hooks/mutations/useResponsibleStoreMutation";
import { AsYouType } from "libphonenumber-js";

export default function ResponsibleCreate() {
  const { control, handleSubmit, setError } = useForm<ResponsibleCreateForm>({
    resolver: yupResolver(responsibleCreateSchema),
  });
  const {
    mutate,
    isLoading: isStoringResponsible,
    message,
  } = useResponsibleStoreMutation({ setError });

  const onSubmit = handleSubmit((responsible) => mutate(responsible));

  return (
    <>
      <Head>
        <title>SchoolGo - Cadastrar Responsável</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cadastrar Responsável" />
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
                        transform={(value) => new AsYouType("BR").input(value)}
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                      <LoadingButton
                        loading={isStoringResponsible}
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
