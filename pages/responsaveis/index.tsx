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
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import { useGetResponsiblesQuery } from "../../src/hooks/queries/useGetResponsiblesQuery";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { useAuth } from "../../src/hooks/useAuth";

export default function Responsibles() {
  const { data: responsibles = [] } = useGetResponsiblesQuery();

  useAuth({ middleware: "auth" });

  return (
    <>
      <Head>
        <title>SchoolGo - Responsáveis</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <Link href="/responsaveis/cadastrar" passHref legacyBehavior>
                    <IconButton aria-label="Cadastrar Responsável">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Responsáveis"
              />
              <CardContent sx={{ padding: 0 }}>
                {responsibles.length === 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <SupervisedUserCircleIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <Typography variant="h5">
                        Nenhum responsável cadastrado
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <List sx={{ width: "100%" }}>
                    {responsibles.map((responsible) => (
                      <>
                        <ListItem
                          alignItems="flex-start"
                          secondaryAction={
                            <>
                              <Link
                                href={{
                                  pathname: "/responsaveis/[id]/editar",
                                  query: { id: responsible.id },
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
                            primary={`${responsible.user.firstName} ${responsible.user.lastName}`}
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
                                    {responsible.user.cellPhone}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {responsible.user.email}
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
