import {Auth} from 'aws-amplify';
import React, {useState} from 'react';
import {Container, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link, useNavigate} from 'react-router-dom';
import Loading from './Loading';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import VerificationCode from './VerificationCode';
import Alert from './Util';
import Snackbar from '@mui/material/Snackbar';
import {ReactComponent as ChessLogo} from '../../assets/logo.svg';


export default function Recover() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [step, setStep] = useState('email');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup
          .string()
          .email(
              'Must be a valid email')
          .max(255)
          .required(
              'Email is required'),
    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      const {email} = values;

      try {
        await Auth.forgotPassword(email);
        setStep('code');
      } catch (error) {
        setErrorMessage('The requested email was not found. Please check and try again.');
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });

  const formikReset = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup
          .string()
          .max(255)
          .min(8)
          .required(
              'Password is required'),
    }),
    onSubmit: async (values, actions) => {
      console.log(values);
      setLoading(true);
      const {password} = values;

      try {
        await Auth.forgotPasswordSubmit(formik.values.email, code, password);
        navigate('/login', {state: {successMessage: 'Password changed successfully.'}});
      } catch (error) {
        setErrorMessage('Invalid verification code provided, please try again.');
        setCode('');
        actions.resetForm();
        setStep('code');
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });

  const verifyCode = (code) => {
    setCode(code);
    setStep('password');
  };

  return (
    <>
      <Container maxWidth={'xs'} component="main"
        sx={{
          minHeight: '100vh', display: 'flex', justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Link to={'/'}>
          <Box height={100}>
            <ChessLogo/>
          </Box>
        </Link>
        {step ==='email' && <form onSubmit={formik.handleSubmit} style={{display: 'grid'}}>
          <Box sx={{my: 3}}>
            <Typography
              variant="h4"
              fontWeight={500}
              sx={{mb: 2}}
            >
                            Forgot password?
            </Typography>
            <Typography
              variant="body1"
            >
              Please enter the address associated with your account.
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
                                Send code
              </Typography>
              <ArrowForwardIcon sx={{fontSize: 20, ml: 1}}/>
            </Button>
          </Box>

        </form>}
        {step === 'password' && <>
          <form onSubmit={formikReset.handleSubmit} style={{display: 'grid'}}>
            <Box sx={{my: 3}}>
              <Typography
                variant="h4"
                fontWeight={500}
                sx={{mb: 2}}
              >
              Reset password
              </Typography>
              <Typography
                variant="body1"
              >
                Please enter the new password for <b> {formik.values.email} </b>
              </Typography>
            </Box>
            <TextField
              error={Boolean(formikReset.touched.password && formikReset.errors.password)}
              fullWidth
              helperText={formikReset.touched.password && formikReset.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formikReset.handleBlur}
              onChange={formikReset.handleChange}
              type="password"
              value={formikReset.values.password}
              variant="outlined"
            />

            <Box sx={{py: 3}}>
              <Button
                color="primary"
                disabled={formikReset.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                <Typography>
                Submit
                </Typography>
                <ArrowForwardIcon sx={{fontSize: 20, ml: 1}}/>
              </Button>
            </Box>

          </form>
        </>
        }
        {step === 'code' && <VerificationCode email={formik.values.email} onSubmit={verifyCode}/>}
      </Container>
      {loading && <Loading/>}
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="warning" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </>
  );
}
