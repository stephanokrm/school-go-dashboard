import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { ControlledTextField } from "@/components/ControlledTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useGetUserByMeQuery } from "@/hooks/queries/useGetUserByMeQuery";
import { useUserUpdateMutation } from "@/hooks/mutations/useUserUpdateMutation";
import Alert from "@mui/material/Alert";
import CardHeader from "@mui/material/CardHeader";
import { userEditSchema } from "@/schemas";
import { UserEditForm } from "@/types";
import { AsYouType } from "libphonenumber-js";

export default function UserMe() {
  const { data: user, isLoading: isLoadingUser } = useGetUserByMeQuery();
  const { control, handleSubmit, setError } = useForm<UserEditForm>({
    resolver: yupResolver(userEditSchema),
    values: user,
  });
  const {
    mutate,
    isLoading: isUpdatingUser,
    message,
  } = useUserUpdateMutation({ setError });

  const onSubmit = handleSubmit((user) => mutate(user));

  const isLoading = isLoadingUser || isUpdatingUser;

  return (
    <>
      <Head>
        <title>SchoolGo - {user?.firstName}</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Minha Conta" />
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
                        loading={isLoadingUser}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="lastName"
                        label="Sobrenome"
                        loading={isLoadingUser}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="email"
                        type="email"
                        label="E-mail"
                        loading={isLoadingUser}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="cellPhone"
                        type="tel"
                        label="Celular"
                        loading={isLoadingUser}
                        transform={(value) => new AsYouType("BR").input(value)}
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                      <LoadingButton
                        loading={isLoading}
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Atualizar
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
