import Container from "@mui/material/Container";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import { useGetStudentsQuery } from "../../src/hooks/queries/useGetStudentsQuery";
import FaceIcon from "@mui/icons-material/Face";
import { DestroyButton } from "../../src/components/DestroyButton";
import { useStudentDestroyMutation } from "../../src/hooks/mutations/useStudentDestroyMutation";
import CircularProgress from "@mui/material/CircularProgress";

export default function Students() {
  const { data: students = [], isLoading: isLoadingStudents } =
    useGetStudentsQuery();
  const { mutate: destroy } = useStudentDestroyMutation();

  return (
    <>
      <Head>
        <title>SchoolGo - Alunos</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <Link href="/alunos/cadastrar" passHref legacyBehavior>
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Alunos"
              />
              <CardContent sx={{ padding: 0 }}>
                {isLoadingStudents && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <CircularProgress />
                    </Grid>
                  </Grid>
                )}
                {!isLoadingStudents && students.length === 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <FaceIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                      <Typography variant="h5">
                        Nenhum aluno cadastrado
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <List sx={{ width: "100%" }}>
                    {students.map((student) => (
                      <>
                        <ListItem
                          secondaryAction={
                            <>
                              <Link
                                href={{
                                  pathname: "/alunos/[id]/editar",
                                  query: { id: student.id },
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
                                onDestroy={async () => destroy(student.id)}
                              />
                            </>
                          }
                        >
                          <ListItemText
                            primary={`${student.firstName} ${student.lastName}`}
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
                                    {student.address.description}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <SchoolIcon sx={{ mr: 1 }} fontSize="small" />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {student.school.name}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <SupervisedUserCircleIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    display="inline"
                                  >
                                    {student.responsible.user.firstName}{" "}
                                    {student.responsible.user.lastName}
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
