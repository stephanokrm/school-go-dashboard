import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import { useDriverUpdateMutation } from "../../../../src/hooks/mutations/useDriverUpdateMutation";
import { ControlledTextField } from "../../../../src/components/ControlledTextField";
import CardHeader from "@mui/material/CardHeader";
import { useRouter } from "next/router";
import { useGetDriverByIdQuery } from "../../../../src/hooks/queries/useGetDriverByIdQuery";

const schema = yup
  .object({
    id: yup.number().required(),
    license: yup.string().required(),
    user: yup
      .object({
        id: yup.number().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        cellPhone: yup.string().required(),
      })
      .required(),
  })
  .required();

export type DriverUpdateFieldValues = yup.InferType<typeof schema>;
export default function DriversEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data: driver, isLoading: isLoadingDriver } = useGetDriverByIdQuery(
    id as string | undefined
  );
  const { control, handleSubmit, setError } = useForm<DriverUpdateFieldValues>({
    resolver: yupResolver(schema),
    values: driver,
  });
  const {
    mutate,
    isLoading: isStoringDriver,
    message,
  } = useDriverUpdateMutation({ setError });
  const onSubmit = handleSubmit((driver) => mutate(driver));

  return (
    <>
      <Head>
        <title>SchoolGo - Editar Motorista</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Editar Motorista" />
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
                        loading={isLoadingDriver}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.lastName"
                        label="Sobrenome"
                        loading={isLoadingDriver}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.email"
                        type="email"
                        label="E-mail"
                        loading={isLoadingDriver}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.cellPhone"
                        type="tel"
                        label="Celular"
                        loading={isLoadingDriver}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="license"
                        label="CNH"
                        loading={isLoadingDriver}
                      />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                      <LoadingButton
                        loading={isStoringDriver}
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
