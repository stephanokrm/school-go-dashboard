import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { ControlledTextField } from "../../../../src/components/ControlledTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useGetUserByMeQuery } from "../../../../src/hooks/queries/useGetUserByMeQuery";
import { useUserUpdateMutation } from "../../../../src/hooks/mutations/useUserUpdateMutation";
import Alert from "@mui/material/Alert";

const schema = yup
  .object({
    id: yup.number().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    cellPhone: yup.string().required(),
  })
  .required();

export type UserEditFieldValues = yup.InferType<typeof schema>;
export default function UsersEdit() {
  const { data: user, isLoading: isLoadingQuery } = useGetUserByMeQuery();
  const { control, handleSubmit, setError } = useForm<UserEditFieldValues>({
    resolver: yupResolver(schema),
    values: user,
  });
  const {
    mutate,
    isLoading: isMutating,
    message,
  } = useUserUpdateMutation({ setError });
  const onSubmit = handleSubmit((user) => mutate(user));

  const isLoading = isLoadingQuery || isMutating;

  return (
    <>
      <Head>
        <title>SchoolGo - {user?.firstName}</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <Avatar
                        alt={user?.firstName}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 150, height: 150 }}
                      />
                    </Grid>
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
                        loading={isLoading}
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Editar
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
