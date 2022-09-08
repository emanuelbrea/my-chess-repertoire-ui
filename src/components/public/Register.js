import Box from '@mui/material/Box';
import {Container, Divider, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {GoogleLoginButton} from 'react-social-login-buttons';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Auth} from 'aws-amplify';
import {Link, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import Loading from './Loading';
import Alert from './Util';
import Snackbar from '@mui/material/Snackbar';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {createUser} from '../../api/user';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

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
      createUser(email, firstName, lastName)
          .then(()=>{
            Auth.signUp({
              username: email,
              password,
              attributes: {
                email,
                name: firstName,
                family_name: lastName,
              },
              autoSignIn: {
                enabled: true,
              },
            }).then(()=>navigate('/verify', {state: {email: email}}));
          }).catch((error)=>setErrorMessage(error.message)).finally(()=>{
            setLoading(false);
            actions.setSubmitting(false);
          });
    },
  });

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
              style={{textDecoration: 'none', color: 'green'}}
            >
              <b>Sign In</b>
            </Link>
          </Typography>

        </form>
      </Container>
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="warning" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>
      {loading && <Loading/>}

    </>
  )
  ;
}
