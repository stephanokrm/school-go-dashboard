import React from "react";
import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Chip from "@mui/material/Chip";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { timelineOppositeContentClasses } from "@mui/lab";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { useTripsQuery } from "@/hooks/queries/useTripsQuery";
import { Trip } from "@/types";
import Box from "@mui/material/Box";

export default function Trips() {
  const { data: trips = [], isLoading: isLoadingTrips } = useTripsQuery({
    administrator: true,
  });

  const groupedTrips = trips.reduce<{ [key: string]: Trip[] }>(
    (grouped, trip) => {
      const day = format(trip.arriveAt, "yyyy-MM-dd");

      if (grouped[day] === undefined) {
        grouped[day] = [trip];
      } else {
        grouped[day] = [...grouped[day], trip];
      }

      return grouped;
    },
    {}
  );

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
                  Object.keys(groupedTrips).map((date) => {
                    const groupDate = parseISO(date);
                    const dateIsToday = isToday(groupDate);
                    const dateIsYesterday = isYesterday(groupDate);

                    return (
                      <Box key={date} mb={2}>
                        <Box pl={2}>
                          <Typography variant="h6">
                            {dateIsToday
                              ? "Hoje"
                              : dateIsYesterday
                              ? "Ontem"
                              : format(groupDate, "PPP")}
                          </Typography>
                        </Box>
                        <Box>
                          {groupedTrips[date].map((trip) => (
                            <Accordion key={trip.id}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Grid
                                  container
                                  spacing={1}
                                  justifyContent="space-between"
                                >
                                  <Grid item>
                                    <Typography gutterBottom>
                                      {trip.round ? "Volta do" : "Ida para"}{" "}
                                      {trip.itinerary.school.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="darkgray"
                                    >
                                      {format(trip.arriveAt, "H:mm")} -{" "}
                                      {trip.itinerary.driver.user.firstName}{" "}
                                      {trip.itinerary.driver.user.lastName}
                                    </Typography>
                                  </Grid>
                                  {trip.startedAt ? (
                                    <Grid
                                      item
                                      display="flex"
                                      alignItems="center"
                                    >
                                      <Chip
                                        color={
                                          trip.finishedAt
                                            ? "success"
                                            : "primary"
                                        }
                                        label={
                                          trip.finishedAt
                                            ? "Finalizada"
                                            : "Em Andamento"
                                        }
                                      />
                                    </Grid>
                                  ) : null}
                                </Grid>
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: 0 }}>
                                <Timeline
                                  sx={{
                                    padding: 0,
                                    [`& .${timelineOppositeContentClasses.root}`]:
                                      {
                                        flex: 0.1,
                                      },
                                  }}
                                >
                                  <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                      {trip.startedAt
                                        ? format(trip.startedAt, "MMM dd, H:mm")
                                        : "-"}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                      <TimelineDot
                                        color={
                                          trip.startedAt ? "success" : undefined
                                        }
                                      />
                                      <TimelineConnector
                                        sx={{
                                          bgcolor: trip.startedAt
                                            ? "success.main"
                                            : undefined,
                                        }}
                                      />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                      <Typography gutterBottom>
                                        Partida
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="darkgray"
                                      >
                                        {trip.round
                                          ? trip.itinerary.school.address
                                              .description
                                          : trip.itinerary.address.description}
                                      </Typography>
                                    </TimelineContent>
                                  </TimelineItem>
                                  {trip.students?.map((student) => (
                                    <TimelineItem key={student.id}>
                                      <TimelineOppositeContent color="text.secondary">
                                        {student.pivot?.embarkedAt
                                          ? format(
                                              student.pivot.embarkedAt,
                                              "MMM dd, H:mm"
                                            )
                                          : student.pivot?.absent
                                          ? "Ausente"
                                          : "-"}
                                      </TimelineOppositeContent>
                                      <TimelineSeparator>
                                        <TimelineDot
                                          color={
                                            student.pivot?.absent
                                              ? "error"
                                              : (trip.round &&
                                                  student.pivot
                                                    ?.disembarkedAt) ||
                                                (!trip.round &&
                                                  student.pivot?.embarkedAt)
                                              ? "success"
                                              : undefined
                                          }
                                        />
                                        <TimelineConnector
                                          sx={{
                                            bgcolor:
                                              (trip.round &&
                                                student.pivot?.disembarkedAt) ||
                                              (!trip.round &&
                                                student.pivot?.embarkedAt)
                                                ? "success.main"
                                                : undefined,
                                          }}
                                        />
                                      </TimelineSeparator>
                                      <TimelineContent>
                                        <Typography gutterBottom>
                                          {student.firstName} {student.lastName}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="darkgray"
                                        >
                                          {student.address.description}
                                        </Typography>
                                      </TimelineContent>
                                    </TimelineItem>
                                  ))}
                                  <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                      {trip.finishedAt
                                        ? format(
                                            trip.finishedAt,
                                            "MMM dd, H:mm"
                                          )
                                        : "-"}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                      <TimelineDot
                                        color={
                                          trip.finishedAt
                                            ? "success"
                                            : undefined
                                        }
                                      />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                      <Typography gutterBottom>
                                        Finalizada
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="darkgray"
                                      >
                                        {trip.round
                                          ? trip.itinerary.address.description
                                          : trip.itinerary.school.address
                                              .description}
                                      </Typography>
                                    </TimelineContent>
                                  </TimelineItem>
                                </Timeline>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                      </Box>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
