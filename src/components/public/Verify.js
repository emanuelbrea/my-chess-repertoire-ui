import React, {useState} from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import {Auth} from 'aws-amplify';
import PropTypes from 'prop-types';
import {Link, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Alert from './Util';
import Snackbar from '@mui/material/Snackbar';

export default function Verify({email, onSubmit}) {
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(email);
      setOpen(true);
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box sx={{my: 3}} display={'flex'} flexDirection={'column'}>
        <Typography
          variant="h4"
          fontWeight={500}
        >
          Verification code
        </Typography>
        <Typography
          variant="subtitle1"
        >
          We have sent a code to <b> {email}</b>
        </Typography>
      </Box>
      <ReactInputVerificationCode onChange={setCode} length={6} onCompleted={(code) => onSubmit(code)} placeholder={''} autoFocus={true} value={code}/>

      <Box sx={{my: 3}}>
        <Typography
          variant="subtitle1"
          marginRight={1}
        >
        Didn&apos;t get a code?
        </Typography>
        <Link
          component="button"
          onClick={() => {
            resendConfirmationCode();
          }}
        >
          <Typography
            variant="body1"
            fontWeight={200}
          >
            <b>Click to resend</b>
          </Typography>
        </Link>
      </Box>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontSize: 16}}>
          Code resent to <b> {email}</b>
        </Alert>
      </Snackbar>
    </>

  );
};

Verify.propTypes = {
  email: PropTypes.string,
  onSubmit: PropTypes.func,
};
