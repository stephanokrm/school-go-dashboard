import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useAuth } from "../../src/hooks/useAuth";

export default function Itineraries() {
  const { data: itineraries = [] } = useGetItinerariesQuery();

  useAuth({ middleware: "auth" });

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
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
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
                                <CalendarMonthIcon
                                  sx={{ mr: 1 }}
                                  fontSize="small"
                                />
                                <Typography variant="subtitle2">
                                  {[
                                    ...(itinerary.monday ? ["Segunda"] : []),
                                    ...(itinerary.tuesday ? ["Terça"] : []),
                                    ...(itinerary.wednesday ? ["Quarta"] : []),
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
