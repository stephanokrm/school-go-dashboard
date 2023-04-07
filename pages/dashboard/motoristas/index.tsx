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
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";

export default function Drivers() {
  return (
    <>
      <Head>
        <title>SchoolGo - Motoristas</title>
      </Head>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <AddIcon />
                  </IconButton>
                }
                title="Motoristas"
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
                      primary="Stephano Ramos"
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={1}>
                            <WhatsAppIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              (51) 99445-6366
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              stephano.ramos.p@gmail.com
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
                      primary="Amanda Costa"
                      secondary={
                        <>
                          <Box display="flex" alignItems="center" mt={1}>
                            <WhatsAppIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              (51) 99445-6366
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="subtitle2" display="inline">
                              stephano.ramos.p@gmail.com
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
