import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledAutocomplete } from "../../src/components/ControlledAutocomplete";
import { useGetDriversQuery } from "../../src/hooks/queries/useGetDriversQuery";
import { useGetSchoolsQuery } from "../../src/hooks/queries/useGetSchoolsQuery";
import { itineraryCreateSchema } from "../../src/schemas";
import { ItineraryCreateForm } from "../../src/types";
import { useGetStudentsQuery } from "../../src/hooks/queries/useGetStudentsQuery";
import { FormLabel } from "@mui/material";
import { ControlledCheckbox } from "../../src/components/ControlledCheckbox";
import Divider from "@mui/material/Divider";
import { useItineraryStoreMutation } from "../../src/hooks/mutations/useItineraryStoreMutation";
import { ControlledGoogleMaps } from "../../src/components/ControlledGoogleMaps";

export default function ItineraryCreate() {
  const { data: drivers = [], isLoading: isLoadingDrivers } =
    useGetDriversQuery();
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const { control, handleSubmit, watch, setValue, setError } =
    useForm<ItineraryCreateForm>({
      resolver: yupResolver(itineraryCreateSchema),
      defaultValues: { students: [] },
    });
  const {
    mutate,
    isLoading: isStoringItinerary,
    message,
  } = useItineraryStoreMutation({ setError });
  const { data: students = [], isLoading: isLoadingStudents } =
    useGetStudentsQuery({
      morning: watch("morning"),
      afternoon: watch("afternoon"),
      night: watch("night"),
    });

  const school = watch("school");
  const onSubmit = handleSubmit((itinerary) => mutate(itinerary));
  const isLoading =
    isStoringItinerary ||
    isLoadingSchools ||
    isLoadingDrivers ||
    isLoadingStudents;

  return (
    <>
      <Head>
        <title>SchoolGo - Cadastrar Itinerário</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cadastrar Itinerário" />
              <CardContent>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    {message && (
                      <Grid item xs={12}>
                        <Alert severity="error">{message}</Alert>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <ControlledAutocomplete
                        loading={isLoadingDrivers}
                        options={drivers}
                        control={control}
                        name="driver"
                        label="Motorista"
                        getOptionLabel={(driver) =>
                          `${driver.user.firstName} ${driver.user.lastName}`
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledAutocomplete
                        loading={isLoadingSchools}
                        options={schools}
                        control={control}
                        name="school"
                        label="Escola"
                        getOptionLabel={(school) => school.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledGoogleMaps
                        label="Endereço de Partida"
                        control={control}
                        name="address"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>Dias</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="monday"
                        label="Segunda"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="tuesday"
                        label="Terça"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="wednesday"
                        label="Quarta"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="thursday"
                        label="Quinta"
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="friday"
                        label="Sexta"
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
                        onInput={() => setValue("students", [])}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="afternoon"
                        label="Tarde"
                        control={control}
                        disabled={!school?.afternoon}
                        onInput={() => setValue("students", [])}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <ControlledCheckbox
                        name="night"
                        label="Noite"
                        control={control}
                        disabled={!school?.night}
                        onInput={() => setValue("students", [])}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledAutocomplete
                        loading={isLoadingStudents}
                        multiple
                        filterSelectedOptions
                        options={students}
                        control={control}
                        name="students"
                        label="Alunos"
                        disabled={
                          !watch("morning") &&
                          !watch("afternoon") &&
                          !watch("night")
                        }
                        getOptionLabel={(student) =>
                          `${student.firstName} ${student.lastName}`
                        }
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={option.firstName}
                              label={`${option.firstName} ${option.lastName}`}
                              avatar={
                                <Avatar
                                  alt={option.firstName}
                                  src="/static/images/avatar/1.jpg"
                                />
                              }
                              sx={{
                                marginTop: {
                                  xs: "10px !important",
                                },
                                marginBottom: {
                                  xs: "10px !important",
                                },
                              }}
                            />
                          ))
                        }
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
