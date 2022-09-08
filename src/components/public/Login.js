import Box from '@mui/material/Box';
import {Container, Divider, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {GoogleLoginButton} from 'react-social-login-buttons';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import Alert from './Util';
import Snackbar from '@mui/material/Snackbar';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [open, setOpen] = useState(false);
  const {state} = useLocation();
  const successMessage = state ? state.successMessage : '';
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (successMessage) {
      setOpen(true);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
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
      password: Yup
          .string()
          .max(255)
          .min(8)
          .required(
              'Password is required'),
    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      const {email, password} = values;

      try {
        await Auth.signIn(email, password);
        navigate('/repertoires');
      } catch (error) {
        if (error.message === 'User is not confirmed.') {
          navigate('/verify', {state: {email: email}});
        }
        setErrorMessage('Invalid email / password combination. Please try again.');
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


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
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Link
              component="button"
              to="/recover"
              style={{textDecoration: 'none'}}
            >
              <Typography
                variant="body1"
                fontWeight={200}
                color={'green'}
              >
                <b>Forgot password?</b>
              </Typography>
            </Link>
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
            <Link style={{textDecoration: 'none', color: 'green'}} component="button" to="/register"
            >
              <b>Sign Up</b>
            </Link>
          </Typography>

        </form>
      </Container>
      {loading && <Loading/>}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontSize: 16}}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="warning" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </>
  );
}
