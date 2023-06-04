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
import { useUserStoreMutation } from "../../src/hooks/mutations/useUserStoreMutation";
import { ControlledTextField } from "../../src/components/ControlledTextField";
import CardHeader from "@mui/material/CardHeader";
import { userCreateSchema } from "../../src/schemas";
import { UserCreateForm } from "../../src/types";

export default function UserCreate() {
  const { control, handleSubmit, setError } = useForm<UserCreateForm>({
    resolver: yupResolver(userCreateSchema),
  });
  const {
    mutate,
    isLoading: isStoringUser,
    message,
  } = useUserStoreMutation({ setError });

  const onSubmit = handleSubmit((user) => mutate(user));

  return (
    <>
      <Head>
        <title>SchoolGo - Cadastrar Usuário</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cadastrar Usuário" />
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
                        name="firstName"
                        label="Nome"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="lastName"
                        label="Sobrenome"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="email"
                        type="email"
                        label="E-mail"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="cellPhone"
                        type="tel"
                        label="Celular"
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                      <LoadingButton
                        loading={isStoringUser}
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
