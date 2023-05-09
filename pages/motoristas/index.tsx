import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import { useGetDriversQuery } from "../../src/hooks/queries/useGetDriversQuery";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { useAuth } from "../../src/hooks/useAuth";
import { DestroyButton } from "../../src/components/DestroyButton";
import { useDriverDestroyMutation } from "../../src/hooks/mutations/useDriverDestroyMutation";
import CircularProgress from "@mui/material/CircularProgress";

export default function Drivers() {
  const { data: drivers = [], isLoading: isLoadingDrivers } =
    useGetDriversQuery();
  const { mutate: destroy } = useDriverDestroyMutation();

  useAuth({ middleware: "auth" });

  return (
    <>
      <Head>
        <title>SchoolGo - Motoristas</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <Link href="/motoristas/cadastrar" passHref legacyBehavior>
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Motoristas"
              />
              <CardContent sx={{ padding: 0 }}>
                {isLoadingDrivers && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                {!isLoadingDrivers && drivers.length === 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <DirectionsBusFilledIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <Typography variant="h5">
                        Nenhum motorista cadastrado
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <List sx={{ width: "100%" }}>
                    {drivers.map((driver) => (
                      <>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <>
                              <Link
                                href={{
                                  pathname: "/motoristas/[id]/editar",
                                  query: { id: driver.id },
                                }}
                                passHref
                                legacyBehavior
                              >
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  sx={{ mr: 0.1 }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <DestroyButton
                                onDestroy={async () => destroy(driver.id)}
                              />
                            </>
                          }
                        >
                          <ListItemText
                            primary={`${driver.user.firstName} ${driver.user.lastName}`}
                            secondary={
                              <>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <WhatsAppIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {driver.user.cellPhone}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {driver.user.email}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <ContactPageIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {driver.license}
                                  </Typography>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
