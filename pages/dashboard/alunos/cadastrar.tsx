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
import { ControlledTextField } from "../../../src/components/ControlledTextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledAutocomplete } from "../../../src/components/ControlledAutocomplete";
import { ControlledCheckbox } from "../../../src/components/ControlledCheckbox";
import { useGetSchoolsQuery } from "../../../src/hooks/queries/useGetSchoolsQuery";
import { ControlledGoogleMaps } from "../../../src/components/ControlledGoogleMaps";
import { studentsCreateSchema } from "../../../src/schemas";

type FormData = yup.InferType<typeof studentsCreateSchema>;

export default function StudentsCreate() {
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(studentsCreateSchema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  const message = "S";
  const isLoading = false;

  return (
    <>
      <Head>
        <title>SchoolGo - Cadastrar Aluno</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cadastrar Aluno" />
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
                    <Grid item xs={12}>
                      <ControlledGoogleMaps
                        label="Endereço"
                        control={control}
                        name="address"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledAutocomplete
                        loading={isLoadingSchools}
                        options={schools}
                        control={control}
                        name="school"
                        label="Escola"
                        getOptionLabel={(school) => school.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ControlledAutocomplete
                        loading
                        options={["dsadasdas", "dsadsadas"]}
                        control={control}
                        name="responsible"
                        label="Responsável"
                      />
                    </Grid>
                    <Grid item>
                      <ControlledCheckbox
                        name="goes"
                        label="Ida"
                        control={control}
                      />
                    </Grid>
                    <Grid item>
                      <ControlledCheckbox
                        name="return"
                        label="Volta"
                        control={control}
                      />
                    </Grid>
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
