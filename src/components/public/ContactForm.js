import Box from '@mui/material/Box';
import {Container, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import Alert from './Util';
import Loading from './Loading';


export default function ContactForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
    validationSchema: Yup.object({
      email: Yup
          .string()
          .email(
              'Must be a valid email')
          .max(255)
          .required(
              'Email is required'),
      name: Yup
          .string()
          .max(255)
          .required(
              'Your name is required'),
      message: Yup
          .string()
          .max(5000)
          .required(
              'The message should not be empty'),

    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      const {email, name, message} = values;
      sendEmail(email, name, message).then(()=>{
        setOpen(true);
      }).catch((err)=>{
        console.log(err.message);
        setErrorMessage('There was a problem sending the message. Please try again later or email me to brea.emanuel@gmail.com');
      }).finally(()=>{
        setLoading(false);
        actions.resetForm();
      });
    },
  });

  const sendEmail = async (email, name, message) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name,
        message: message,
      }),
    };
    await fetch('https://wmtpc5oh30.execute-api.us-east-1.amazonaws.com/contact', requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error('There was an error sending the message.');
          }
          return res.json();
        });
  };

  return (
    <>
      <Container maxWidth={'sm'} component="main"
        sx={{
          minHeight: '100vh', display: 'flex', justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <form onSubmit={formik.handleSubmit} style={{display: 'grid'}}>
          <Box sx={{my: 3}}>
            <Typography
              variant="h3"
              fontWeight={500}
            >
            Contact Us
            </Typography>
            <Typography
              variant="h5"
              fontWeight={200}
            >
            We would love to hear from you
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
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
            error={Boolean(formik.touched.message && formik.errors.message)}
            fullWidth
            helperText={formik.touched.message && formik.errors.message}
            label="Message"
            margin="normal"
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
            variant="outlined"
            multiline
            rows={4}
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
              Send Message
              </Typography>
            </Button>
          </Box>

        </form>
      </Container>
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="warning" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{width: '100%', fontSize: 16}}>
          Message sent!
        </Alert>
      </Snackbar>
      {loading && <Loading/>}
    </>
  );
}
