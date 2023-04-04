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

export default function Itineraries() {
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
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          sx={{ mr: 0.1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary="Colégio Cristo Redentor"
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={1}>
                            <DirectionsBusIcon
                              sx={{ mr: 1 }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2" display="inline">
                              Rogério
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <CalendarMonthIcon
                              sx={{ mr: 1 }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2">
                              Segunda, Terça e Quarta
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          sx={{ mr: 0.1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary="Colégio Cristo Redentor"
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={1}>
                            <DirectionsBusIcon
                              sx={{ mr: 1 }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2" display="inline">
                              Matheus
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <CalendarMonthIcon
                              sx={{ mr: 1 }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2">
                              Quinta e Sexta
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
