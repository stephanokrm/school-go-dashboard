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
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledAutocomplete } from "../../../src/components/ControlledAutocomplete";
import { DateCalendar } from "@mui/x-date-pickers";
import { useGetDriversQuery } from "../../../src/hooks/queries/useGetDriversQuery";

const schema = yup
  .object({
    driver: yup.string(),
    school: yup.string(),
    students: yup.string(),
    direction: yup.boolean(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function ItinerariesCreate() {
  const { data: drivers = [], isLoading: isLoadingDrivers } =
    useGetDriversQuery();
  const { control, handleSubmit, getValues } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  const message = "S";
  const isLoading = false;

  console.log({ formState: getValues() });

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    {message && (
                      <Grid item xs={12}>
                        <Alert severity="error">{message}</Alert>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <DateCalendar />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
                      <ControlledAutocomplete
                        loading
                        options={[]}
                        control={control}
                        name="school"
                        label="Escola"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledAutocomplete
                        loading
                        multiple
                        filterSelectedOptions
                        options={["dsadasdas", "dsadsadas"]}
                        control={control}
                        name="students"
                        label="Alunos"
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={option}
                              label={option}
                              avatar={
                                <Avatar
                                  alt={option}
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
