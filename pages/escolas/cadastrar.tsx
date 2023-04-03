import Container from "@mui/material/Container";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from "@mui/icons-material/School";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ControlledTextField} from "../../src/components/ControlledTextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import {ControlledAutocomplete} from "../../src/components/ControlledAutocomplete";
import Responsible from "../responsaveis";

const schema = yup.object({
    name: yup.string().required(),
    address: yup.string().required(),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function SchoolsCreate() {
    const {control, handleSubmit} = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    const message = 'S'
    const isLoading = false;

    return (
        <>
            <Head>
                <title>SchoolGo - Cadastrar Escola</title>
            </Head>
            <Container maxWidth="xl" disableGutters>
                <Grid container>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Cadastrar Escola"/>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2}>
                                        {message && (
                                            <Grid item xs={12}>
                                                <Alert severity="error">{message}</Alert>
                                            </Grid>
                                        )}
                                        <Grid item xs={12} md={6}>
                                            <ControlledTextField control={control} name="name"
                                                                 label="Nome"/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ControlledAutocomplete loading options={[]} control={control}
                                                                    name="address" label="Endereço"/>
                                        </Grid>
                                        <Grid item xs={12} display="flex" justifyContent="end">
                                            <LoadingButton
                                                loading={isLoading}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Cadastrar
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}