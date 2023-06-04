import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useGetItinerariesQuery } from "../../src/hooks/queries/useGetItinerariesQuery";
import RouteIcon from "@mui/icons-material/Route";
import { DestroyButton } from "../../src/components/DestroyButton";
import { useItineraryDestroyMutation } from "../../src/hooks/mutations/useItineraryDestroyMutation";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Itineraries() {
  const { data: itineraries = [], isLoading: isLoadingItineraries } =
    useGetItinerariesQuery();
  const { mutate: destroy } = useItineraryDestroyMutation();

  return (
    <>
      <Head>
        <title>SchoolGo - Itinerários</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <Link href="/itinerarios/cadastrar" passHref legacyBehavior>
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Itinerários"
              />
              <CardContent sx={{ padding: 0 }}>
                {isLoadingItineraries && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                {!isLoadingItineraries && itineraries.length === 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <RouteIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <Typography variant="h5">
                        Nenhum itinerário cadastrado
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <List sx={{ width: "100%" }}>
                    {itineraries.map((itinerary) => (
                      <>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <>
                              <Link
                                href={{
                                  pathname: "/itinerarios/[id]/editar",
                                  query: { id: itinerary.id },
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
                                onDestroy={async () => destroy(itinerary.id)}
                              />
                            </>
                          }
                        >
                          <ListItemText
                            primary={itinerary.school.name}
                            secondary={
                              <>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <DirectionsBusIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {itinerary.driver.user.firstName}{" "}
                                    {itinerary.driver.user.lastName}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <LocationOnIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {itinerary.address.description}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <CalendarMonthIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography variant="subtitle2">
                                    {[
                                      ...(itinerary.monday ? ["Segunda"] : []),
                                      ...(itinerary.tuesday ? ["Terça"] : []),
                                      ...(itinerary.wednesday
                                        ? ["Quarta"]
                                        : []),
                                      ...(itinerary.thursday ? ["Quinta"] : []),
                                      ...(itinerary.friday ? ["Sexta"] : []),
                                    ].join(", ")}
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
