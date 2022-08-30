import * as React from 'react';
import {useState} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    FormGroup,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StyleGrid from "./Style";
import NavBarLogged from "./NavBarLogged";

export default function Profile(props) {

    const [values, setValues] = useState({
        firstName: 'Emanuel',
        lastName: 'Brea',
        email: 'emanuel@gmail.com',
        ratingElo: 2400,
    });

    const [unrated, setUnrated] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    return (
        <>
            <head>
                <title>
                    Account | My chess repertoire
                </title>
            </head>
            <NavBarLogged/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="md">
                    <form
                        autoComplete="off"
                        noValidate
                        {...props}
                    >
                        <Card sx={{my: 3}}>
                            <CardHeader
                                title="Profile"
                            />
                            <Divider/>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            helperText="Please specify the first name"
                                            label="First name"
                                            name="firstName"
                                            onChange={handleChange}
                                            required
                                            value={values.firstName}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Last name"
                                            name="lastName"
                                            onChange={handleChange}
                                            required
                                            value={values.lastName}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            value={values.email}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <Box sx={{display: "flex", flexDirection: "row"}}>
                                            <TextField
                                                label="FIDE rating"
                                                name="ratingElo"
                                                onChange={handleChange}
                                                required
                                                type="number"
                                                value={values.ratingElo}
                                                variant="outlined"
                                                InputProps={{
                                                    inputProps: {
                                                        max: 2800, min: 0
                                                    }
                                                }}
                                                sx={{paddingRight: 2, minWidth: 140}}
                                                disabled={unrated === true}
                                            />
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        onChange={event => {
                                                            setValues({
                                                                ...values,
                                                                ['ratingElo']: 0
                                                            })
                                                            setUnrated(event.target.checked);
                                                        }
                                                        }
                                                    />}
                                                    label="Unrated"/>
                                            </FormGroup>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Playing style"
                            />
                            <Divider/>
                            <CardContent>
                                <StyleGrid/>

                            </CardContent>
                            <Divider/>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                >
                                    Save details
                                </Button>
                            </Box>
                        </Card>
                    </form>

                </Container>
            </Box>

        </>


    )
}