import Box from '@mui/material/Box';
import {Container, Divider, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {GoogleLoginButton} from 'react-social-login-buttons';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Auth} from 'aws-amplify';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Loading from './Loading';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup
          .string()
          .email(
              'Must be a valid email')
          .max(255)
          .required(
              'Email is required'),
      firstName: Yup
          .string()
          .max(255)
          .required(
              'First name is required'),
      lastName: Yup
          .string()
          .max(255)
          .required(
              'Last name is required'),
      password: Yup
          .string()
          .max(255)
          .min(8)
          .required(
              'Password is required'),
    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      const {email, firstName, lastName, password} = values;
      try {
        const cognitoUser = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            name: firstName,
          },
          autoSignIn: {
            enabled: true,
          },
        });

        const user = await createUser(email, firstName);
      } catch (error) {
        console.log('error creating user: ', error);
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });

  const createUser = async (email, firstName) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        email: email,
      }),
    };
    const userCreated = await fetch('/api/user', requestOptions)
        .then((res) => res.json());
    return userCreated;
  };

  return (
    <>
      <Container maxWidth={'sm'} component="main"
        sx={{
          minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column',
          marginY: 5,
        }}>
        <Box
          sx={{marginBottom: 3}}
          component="a"
          href="/">
          <img src="/logo.svg" height={100}
          />
        </Box>
        <form onSubmit={formik.handleSubmit} style={{display: 'grid'}}>
          <Box sx={{my: 3}}>
            <Typography
              variant="h3"
              fontWeight={500}
            >
                            Create a new account
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            fullWidth
            helperText={formik.touched.firstName && formik.errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            fullWidth
            helperText={formik.touched.lastName && formik.errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            variant="outlined"
          />
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
            <GoogleLoginButton align={'center'}>
              <span>Continue with Google</span>
            </GoogleLoginButton>
          </Box>
          <Typography
            color="textSecondary"
            variant="body"
          >
                        Have an account?
            {' '}
            <Link
              to="/login"
              style={{textDecoration: 'none'}}
            >
                            Sign In
            </Link>
          </Typography>

        </form>
      </Container>
      {loading && <Loading/>}
    </>
  )
  ;
}
