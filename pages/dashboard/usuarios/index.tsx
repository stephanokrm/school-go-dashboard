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
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import { useGetUsersQuery } from "../../../src/hooks/queries/useGetUsersQuery";
import Skeleton from "@mui/material/Skeleton";

export default function Users() {
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useGetUsersQuery();

  return (
    <>
      <Head>
        <title>SchoolGo - Usuários</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <Link
                    href="/dashboard/usuarios/cadastrar"
                    passHref
                    legacyBehavior
                  >
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Usuários"
              />
              <CardContent sx={{ padding: 0 }}>
                <List sx={{ width: "100%" }}>
                  {users.map((user) => (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <>
                            <Link
                              href={{
                                pathname: "/dashboard/usuarios/[id]/editar",
                                query: { id: user.id },
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
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={
                            <>
                              <Box display="flex" alignItems="center" mt={1}>
                                <WhatsAppIcon sx={{ mr: 1 }} fontSize="small" />
                                <Typography
                                  variant="subtitle2"
                                  display="inline"
                                >
                                  {user.cellPhone}
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" mt={1}>
                                <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                                <Typography
                                  variant="subtitle2"
                                  display="inline"
                                >
                                  {user.email}
                                </Typography>
                              </Box>
                              {user.roles && user.roles.length > 0 && (
                                <Box display="flex" alignItems="center" mt={1}>
                                  <KeyIcon sx={{ mr: 1 }} fontSize="small" />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {user.roles
                                      .map(({ role }) => role)
                                      .join(", ")}
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
                  {isLoadingUsers || isFetchingUsers ? (
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Skeleton variant="rectangular" width="100%" />
                        }
                        secondary={
                          <>
                            <Box display="flex" alignItems="center" mt={1}>
                              <WhatsAppIcon sx={{ mr: 1 }} fontSize="small" />
                              <Typography variant="subtitle2" display="inline">
                                <Skeleton variant="rectangular" width="100%" />
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mt={1}>
                              <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                              <Typography variant="subtitle2" display="inline">
                                <Skeleton variant="rectangular" width="100%" />
                              </Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ) : null}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
