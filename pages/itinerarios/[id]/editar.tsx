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
import { ControlledAutocomplete } from "../../../src/components/ControlledAutocomplete";
import { useGetDriversQuery } from "../../../src/hooks/queries/useGetDriversQuery";
import { useGetSchoolsQuery } from "../../../src/hooks/queries/useGetSchoolsQuery";
import { itineraryEditSchema } from "../../../src/schemas";
import { ItineraryEditForm } from "../../../src/types";
import { useGetStudentsQuery } from "../../../src/hooks/queries/useGetStudentsQuery";
import { FormLabel } from "@mui/material";
import { ControlledCheckbox } from "../../../src/components/ControlledCheckbox";
import Divider from "@mui/material/Divider";
import { useItineraryUpdateMutation } from "../../../src/hooks/mutations/useItineraryUpdateMutation";
import { useRouter } from "next/router";
import { useGetItineraryByIdQuery } from "../../../src/hooks/queries/useGetItineraryByIdQuery";
import { useAuth } from "../../../src/hooks/useAuth";

export default function ItineraryEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data: itinerary, isLoading: isLoadingItinerary } =
    useGetItineraryByIdQuery(id as string | undefined);
  const { data: drivers = [], isLoading: isLoadingDrivers } =
    useGetDriversQuery();
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const { control, handleSubmit, watch, setValue, setError, formState } =
    useForm<ItineraryEditForm>({
      resolver: yupResolver(itineraryEditSchema),
      values: itinerary,
      defaultValues: { students: [] },
    });
  const {
    mutate,
    isLoading: isUpdatingItinerary,
    message,
  } = useItineraryUpdateMutation({ setError });
  const { data: students = [], isLoading: isLoadingStudents } =
    useGetStudentsQuery({
      morning: watch("morning"),
      afternoon: watch("afternoon"),
      night: watch("night"),
    });

  useAuth({ middleware: "auth" });

  const school = watch("school");
  const onSubmit = handleSubmit((itinerary) => mutate(itinerary));
  const isLoading =
    isLoadingItinerary ||
    isUpdatingItinerary ||
    isLoadingSchools ||
    isLoadingDrivers ||
    isLoadingStudents;

  return (
    <>
      <Head>
        <title>SchoolGo - Editar Itinerário</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Editar Itinerário" />
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