import { NextPage } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import Head from "next/head";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledTextField } from "@/components/ControlledTextField";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/mutations/useLoginMutation";
import { LoginForm } from "@/types";
import { loginSchema } from "@/schemas";

const Login: NextPage = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const { mutate, isLoading, message } = useLoginMutation();
  const onSubmit = handleSubmit((login) => mutate(login));

  return (
    <>
      <Head>
        <title>SchoolGo - Login</title>
      </Head>
      <Container maxWidth="sm" disableGutters>
        <Box paddingY={10}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item>
              <Card>
                <CardContent>
                  <form onSubmit={onSubmit}>
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Grid item xs={12}>
                        <SchoolIcon fontSize="large" color="primary" />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h2">SchoolGo</Typography>
                      </Grid>
                      {message && (
                        <Grid item xs={12}>
                          <Alert severity="error">{message}</Alert>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="email"
                          type="email"
                          label="E-mail"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ControlledTextField
                          name="password"
                          type="password"
                          label="Senha"
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LoadingButton
                          fullWidth
                          loading={isLoading}
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Entrar
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Login;
