import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import Box from "@mui/material/Box";
import { useAuth } from "../../src/hooks/useAuth";
import { useTripsQuery } from "../../src/hooks/queries/useTripsQuery";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CircularProgress from "@mui/material/CircularProgress";

export default function Trips() {
  const { data: trips = [], isLoading: isLoadingTrips } = useTripsQuery();

  useAuth({ middleware: "auth" });

  return (
    <>
      <Head>
        <title>SchoolGo - Viagens</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Viagens" />
              <CardContent sx={{ padding: 0 }}>
                {isLoadingTrips && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                {!isLoadingTrips && trips.length === 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <TravelExploreIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <Typography variant="h5">Nenhuma viagem hoje</Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <List sx={{ width: "100%" }}>
                    {trips.map((trip) => (
                      <>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={`${trip.itinerary.school.name}${
                              trip.startedAt
                                ? trip.finishedAt
                                  ? " (Finalizada)"
                                  : " (Em Andamento)"
                                : ""
                            }`}
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
                                    {trip.itinerary.driver.user.firstName}{" "}
                                    {trip.itinerary.driver.user.lastName}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <DepartureBoardIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography variant="subtitle2">
                                    {new Intl.DateTimeFormat("default", {
                                      day: "numeric",
                                      month: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                    }).format(trip.arriveAt)}
                                  </Typography>
                                </Box>
                                {trip.startedAt && (
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    mt={1}
                                  >
                                    <PlayArrowIcon
                                      sx={{ mr: 1 }}
                                      fontSize="small"
                                    />
                                    <Typography variant="subtitle2">
                                      {new Intl.DateTimeFormat("default", {
                                        day: "numeric",
                                        month: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                      }).format(trip.startedAt)}
                                    </Typography>
                                  </Box>
                                )}
                                {trip.finishedAt && (
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    mt={1}
                                  >
                                    <CheckCircleOutlineIcon
                                      sx={{ mr: 1 }}
                                      fontSize="small"
                                    />
                                    <Typography variant="subtitle2">
                                      {new Intl.DateTimeFormat("default", {
                                        day: "numeric",
                                        month: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                      }).format(trip.finishedAt)}
                                    </Typography>
                                  </Box>
                                )}
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
