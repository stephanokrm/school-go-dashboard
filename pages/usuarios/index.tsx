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
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import { useGetUsersQuery } from "../../src/hooks/queries/useGetUsersQuery";
import { useAuth } from "../../src/hooks/useAuth";
import { DestroyButton } from "../../src/components/DestroyButton";
import { useUserDestroyMutation } from "../../src/hooks/mutations/useUserDestroyMutation";
import CircularProgress from "@mui/material/CircularProgress";

export default function Users() {
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
  const { mutate: destroy } = useUserDestroyMutation();
  const { user: me } = useAuth({ middleware: "auth" });

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
                  <Link href="/usuarios/cadastrar" passHref legacyBehavior>
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Usuários"
              />
              <CardContent sx={{ padding: 0 }}>
                {isLoadingUsers && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                <List sx={{ width: "100%" }}>
                  {users.map((user) => (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <>
                            <Link
                              href={{
                                pathname: "/usuarios/[id]/editar",
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
                            {user.id !== me?.id && (
                              <DestroyButton
                                onDestroy={async () => destroy(user.id)}
                              />
                            )}
                          </>
                        }
                      >
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName} ${
                            user.id === me?.id ? "(Você)" : ""
                          }`}
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
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
