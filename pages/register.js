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


export default function Register() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            policy: false
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
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'This field must be checked'
                )
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
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                            backgroundImage: 'url(../chess-bg1.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '0% 5% 5% 0%',
                            boxShadow: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'

                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 800,
                            }}
                        >
                            <Typography gutterBottom variant="h3" component="div" fontWeight={500}>
                                Your chess repertoire in one place
                            </Typography>
                            <Typography sx={{mb: 50}}>
                                Easily manage your openings
                            </Typography>
                        </Box>


                    </Grid>
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
                        <form onSubmit={formik.handleSubmit}>
                            <Box sx={{my: 3}}>
                                <Typography
                                    variant="h3"
                                    fontWeight={500}
                                >
                                    Sign up
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
                                    checked={formik.values.policy}
                                    name="policy"
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
                                <Button
                                    color="primary"
                                    disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    <Typography>
                                        Sign Up
                                    </Typography>
                                    <ArrowForwardIcon sx={{fontSize: 20, ml: 1}}/>
                                </Button>
                                <Divider spacing={2} sx={{my: 3}}>or</Divider>
                                <GoogleLoginButton align={"center"}>
                                </GoogleLoginButton>
                            </Box>
                            <Typography
                                color="textSecondary"
                                variant="body"
                            >
                                Have an account?
                                {' '}
                                <NextLink
                                    href="/login"
                                    passHref
                                >
                                    <Link
                                        variant="subtitle"
                                        underline="hover"
                                    >
                                        Sign In
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