import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledTextField } from "../../../../src/components/ControlledTextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledAutocomplete } from "../../../../src/components/ControlledAutocomplete";
import { ControlledCheckbox } from "../../../../src/components/ControlledCheckbox";
import { useGetSchoolsQuery } from "../../../../src/hooks/queries/useGetSchoolsQuery";
import { ControlledGoogleMaps } from "../../../../src/components/ControlledGoogleMaps";
import Divider from "@mui/material/Divider";
import { FormLabel } from "@mui/material";
import { useGetResponsiblesQuery } from "../../../../src/hooks/queries/useGetResponsiblesQuery";
import { useRouter } from "next/router";
import { studentEditSchema } from "../../../../src/schemas";
import { StudentEditForm } from "../../../../src/types";
import { useGetStudentByIdQuery } from "../../../../src/hooks/queries/useGetStudentByIdQuery";
import { useStudentUpdateMutation } from "../../../../src/hooks/mutations/useStudentUpdateMutation";

export default function StudentEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data: student, isLoading: isLoadingStudent } = useGetStudentByIdQuery(
    id as string | undefined
  );
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const { data: responsibles = [], isLoading: isLoadingResponsibles } =
    useGetResponsiblesQuery();
  const { control, handleSubmit, watch, setError } = useForm<StudentEditForm>({
    resolver: yupResolver(studentEditSchema),
    values: student,
  });
  const {
    mutate,
    isLoading: isUpdatingStudent,
    message,
  } = useStudentUpdateMutation({ setError });

  const onSubmit = handleSubmit((student) => mutate(student));
  const isLoading =
    isLoadingSchools || isLoadingResponsibles || isUpdatingStudent;

  return (
    <>
      <Head>
        <title>SchoolGo - Editar Aluno</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Editar Aluno" />
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
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>Turnos</FormLabel>
                    </Grid>
                    <Grid item>
                      <ControlledCheckbox
                        name="morning"
                        label="Manhã"
                        control={control}
                        disabled={!watch("school.morning")}
                      />
                    </Grid>
                    <Grid item>
                      <ControlledCheckbox
                        name="afternoon"
                        label="Tarde"
                        control={control}
                        disabled={!watch("school.afternoon")}
                      />
                    </Grid>
                    <Grid item>
                      <ControlledCheckbox
                        name="night"
                        label="Noite"
                        control={control}
                        disabled={!watch("school.night")}
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
