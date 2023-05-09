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
import { ControlledTextField } from "../../src/components/ControlledTextField";
import { useForm } from "react-hook-form";
import { usePasswordResetMutation } from "../../src/hooks/mutations/usePasswordResetMutation";
import { PasswordResetForm } from "../../src/types";
import { passwordResetFormSchema } from "../../src/schemas";
import { useAuth } from "../../src/hooks/useAuth";
import { useRouter } from "next/router";

const PasswordReset: NextPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<PasswordResetForm>({
    resolver: yupResolver(passwordResetFormSchema),
    values: {
      email: router.query.email as string,
      token: router.query.token as string,
      password: "",
      passwordConfirmation: "",
    },
  });
  const { mutate, isLoading, message } = usePasswordResetMutation();
  const onSubmit = handleSubmit((reset) => mutate(reset));

  useAuth({ middleware: "guest" });

  return (
    <>
      <Head>
        <title>SchoolGo - Redefinir Senha</title>
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
                        <ControlledTextField
                          name="passwordConfirmation"
                          type="password"
                          label="Confirmar Senha"
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
                          Redefinir Senha
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

export default PasswordReset;
