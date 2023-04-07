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
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";

export default function Students() {
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
                  <Link
                    href="/dashboard/alunos/cadastrar"
                    passHref
                    legacyBehavior
                  >
                    <IconButton aria-label="settings">
                      <AddIcon />
                    </IconButton>
                  </Link>
                }
                title="Alunos"
              />
              <CardContent sx={{ padding: 0 }}>
                <List sx={{ width: "100%" }}>
                  <ListItem
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
                      primary="Stephano Ramos"
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={1}>
                            <LocationOnIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              Av. Inconfidência, 1231 Bairro - Mal. Rondon,
                              Canoas - RS, 92030-320
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <SchoolIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              Colégio Cristo Redentor
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <SupervisedUserCircleIcon
                              sx={{ mr: 1 }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2" display="inline">
                              André
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem
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
                      primary="Amanda Costa"
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={1}>
                            <LocationOnIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              Av. Inconfidência, 1231 Bairro - Mal. Rondon,
                              Canoas - RS, 92030-320
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <SchoolIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              Colégio Espírito Santo
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <SupervisedUserCircleIcon
                              sx={{ mr: 1 }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2" display="inline">
                              Matheus
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
