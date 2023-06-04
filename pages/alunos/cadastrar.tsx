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
import { ControlledAutocomplete } from "../../src/components/ControlledAutocomplete";
import { ControlledCheckbox } from "../../src/components/ControlledCheckbox";
import { useGetSchoolsQuery } from "../../src/hooks/queries/useGetSchoolsQuery";
import { ControlledGoogleMaps } from "../../src/components/ControlledGoogleMaps";
import { studentCreateSchema } from "../../src/schemas";
import Divider from "@mui/material/Divider";
import { FormLabel } from "@mui/material";
import { useGetResponsiblesQuery } from "../../src/hooks/queries/useGetResponsiblesQuery";
import { useStudentStoreMutation } from "../../src/hooks/mutations/useStudentStoreMutation";
import { StudentCreateForm } from "../../src/types";

export default function StudentCreate() {
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const { data: responsibles = [], isLoading: isLoadingResponsibles } =
    useGetResponsiblesQuery();
  const { control, handleSubmit, watch, setError } = useForm<StudentCreateForm>(
    {
      resolver: yupResolver(studentCreateSchema),
    }
  );
  const {
    mutate,
    isLoading: isStoringStudent,
    message,
  } = useStudentStoreMutation({ setError });

  const school = watch("school");
  const onSubmit = handleSubmit((student) => mutate(student));
  const isLoading =
    isLoadingSchools || isLoadingResponsibles || isStoringStudent;

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
                        loading={isLoadingResponsibles}
                        options={responsibles}
                        control={control}
                        name="responsible"
                        label="Responsável"
                        getOptionLabel={(responsible) =>
                          `${responsible.user.firstName} ${responsible.user.lastName}`
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>Trajetos</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="goes"
                        label="Ida"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="return"
                        label="Volta"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>Turnos</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="morning"
                        label="Manhã"
                        control={control}
                        disabled={!school?.morning}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="afternoon"
                        label="Tarde"
                        control={control}
                        disabled={!school?.afternoon}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="night"
                        label="Noite"
                        control={control}
                        disabled={!school?.night}
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
