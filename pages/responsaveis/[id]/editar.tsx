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
import { ControlledTextField } from "../../../src/components/ControlledTextField";
import CardHeader from "@mui/material/CardHeader";
import { responsibleEditSchema } from "../../../src/schemas";
import { ResponsibleEditForm } from "../../../src/types";
import { useResponsibleUpdateMutation } from "../../../src/hooks/mutations/useResponsibleUpdateMutation";
import { useRouter } from "next/router";
import { useGetResponsibleByIdQuery } from "../../../src/hooks/queries/useGetResponsibleByIdQuery";
import { useAuth } from "../../../src/hooks/useAuth";

export default function ResponsibleEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data: responsible, isLoading: isLoadingResponsible } =
    useGetResponsibleByIdQuery(id as string | undefined);
  const { control, handleSubmit, setError } = useForm<ResponsibleEditForm>({
    resolver: yupResolver(responsibleEditSchema),
    values: responsible,
  });
  const {
    mutate,
    isLoading: isUpdatingResponsible,
    message,
  } = useResponsibleUpdateMutation({ setError });

  useAuth({ middleware: "auth" });

  const isLoading = isLoadingResponsible || isUpdatingResponsible;
  const onSubmit = handleSubmit((responsible) => mutate(responsible));

  return (
    <>
      <Head>
        <title>SchoolGo - Editar Responsável</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Editar Responsável" />
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
                        loading={isLoadingResponsible}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.lastName"
                        label="Sobrenome"
                        loading={isLoadingResponsible}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.email"
                        type="email"
                        label="E-mail"
                        loading={isLoadingResponsible}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledTextField
                        control={control}
                        name="user.cellPhone"
                        type="tel"
                        label="Celular"
                        loading={isLoadingResponsible}
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
