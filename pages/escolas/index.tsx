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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import { useGetSchoolsQuery } from "../../src/hooks/queries/useGetSchoolsQuery";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../../src/hooks/useAuth";
import { DestroyButton } from "../../src/components/DestroyButton";
import { useSchoolDestroyMutation } from "../../src/hooks/mutations/useSchoolDestroyMutation";
import CircularProgress from "@mui/material/CircularProgress";

export default function Schools() {
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();
  const { mutate: destroy } = useSchoolDestroyMutation();

  useAuth({ middleware: "auth" });

  return (
    <>
      <Head>
        <title>SchoolGo - Escolas</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <Link href="/escolas/cadastrar" passHref legacyBehavior>
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Escolas"
              />
              <CardContent sx={{ padding: 0 }}>
                {isLoadingSchools && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                {!isLoadingSchools && schools.length === 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <SchoolIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <Typography variant="h5">
                        Nenhuma escola cadastrada
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <List sx={{ width: "100%" }}>
                    {schools.map((school) => (
                      <>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <>
                              <Link
                                href={{
                                  pathname: "/escolas/[id]/editar",
                                  query: { id: school.id },
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
                                onDestroy={async () => destroy(school.id)}
                              />
                            </>
                          }
                        >
                          <ListItemText
                            primary={school.name}
                            secondary={
                              <>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <LocationOnIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {school.address.description}
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
