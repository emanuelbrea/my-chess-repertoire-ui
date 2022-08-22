import Head from "next/head";
import Box from "@mui/material/Box";
import {Checkbox, Divider, Link, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useFormik} from 'formik';
import * as Yup from "yup";
import {useRouter} from "next/router";
import {GoogleLoginButton} from "react-social-login-buttons";
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from "next/link";
import LeftBanner from "../src/LeftBanner";

export default function Register() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required'),
        }),
        onSubmit: () => {
            router.push('/');
        }
    });

    return (
        <>
            <Head>
                <title>
                    Login | My chess repertoire
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                }}
            >
                <Grid container sx={{height: '100vh'}}>
                    <LeftBanner/>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{marginBottom: 3}}
                            component="a"
                            href="/">
                            <img src="/logo.svg" height={100}
                            />
                        </Box>
                        <form onSubmit={formik.handleSubmit} sx={{display: "grid"}}>
                            <Box sx={{my: 3}}>
                                <Typography
                                    variant="h3"
                                    fontWeight={500}
                                >
                                    Sign in
                                </Typography>
                            </Box>
                            <TextField
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                fullWidth
                                helperText={formik.touched.email && formik.errors.email}
                                label="Email Address"
                                margin="normal"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.email}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                                margin="normal"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    ml: -1
                                }}
                            >
                                <Checkbox
                                    checked={formik.values.remember}
                                    name="remember"
                                    onChange={formik.handleChange}
                                />
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Remember me
                                </Typography>
                            </Box>

                            <Box sx={{py: 3}}>
                                <NextLink href="/repertoire" passHref>
                                    <Button
                                        color="primary"
                                        disabled={formik.isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        <Typography>
                                            Sign in
                                        </Typography>
                                        <ArrowForwardIcon sx={{fontSize: 20, ml: 1}}/>
                                    </Button>
                                </NextLink>
                                <Divider spacing={2} sx={{my: 3}}>or</Divider>
                                <GoogleLoginButton align={"center"}>
                                </GoogleLoginButton>
                            </Box>
                            <Typography
                                color="textSecondary"
                                variant="body"
                            >
                                Don't have an account?
                                {' '}
                                <NextLink
                                    href="/register"
                                    passHref
                                >
                                    <Link
                                        variant="subtitle"
                                        underline="hover"
                                    >
                                        Sign Up
                                    </Link>
                                </NextLink>
                            </Typography>

                        </form>
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}