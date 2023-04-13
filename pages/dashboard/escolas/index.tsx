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
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import { useGetSchoolsQuery } from "../../../src/hooks/queries/useGetSchoolsQuery";

export default function Schools() {
  const { data: schools = [], isLoading: isLoadingSchools } =
    useGetSchoolsQuery();

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
                  <Link
                    href="/dashboard/escolas/cadastrar"
                    passHref
                    legacyBehavior
                  >
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Escolas"
              />
              <CardContent sx={{ padding: 0 }}>
                <List sx={{ width: "100%" }}>
                  {schools.map((school) => (
                    <>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
