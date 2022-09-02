import Box from '@mui/material/Box';
import {Checkbox, Container, Divider, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {GoogleLoginButton} from 'react-social-login-buttons';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link, useNavigate} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import React, {useState} from 'react';
import Loading from './Loading';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
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
    onSubmit: async (values, actions) => {
      setLoading(true);
      const {email, password} = values;

      try {
        const cognitoUser = await Auth.signIn(email, password);
        navigate('/repertoire/white');
      } catch (error) {
        console.log('Error signing in', error);
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });


  return (
    <>
      <Container maxWidth={'sm'} component="main"
        sx={{
          minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Box
          sx={{marginBottom: 3}}
          component="a"
          href="/">
          <img src="/logo.svg" height={100}
          />
        </Box>
        <form onSubmit={formik.handleSubmit} sx={{display: 'grid'}}>
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
              ml: -1,
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
            <Divider spacing={2} sx={{my: 3}}>or</Divider>
            <GoogleLoginButton align={'center'}>
            </GoogleLoginButton>
          </Box>
          <Typography
            color="textSecondary"
            variant="body"
          >
                        Don&apos;t have an account?
            {' '}
            <Link style={{textDecoration: 'none'}}
              to="/register"
            >
                            Sign Up
            </Link>
          </Typography>

        </form>
      </Container>
      {loading && <Loading/>}

    </>
  );
}
