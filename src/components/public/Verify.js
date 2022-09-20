import {Auth, Hub} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import Snackbar from '@mui/material/Snackbar';
import Alert from './Util';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import {Container} from '@mui/material';
import VerificationCode from './VerificationCode';
import {ReactComponent as ReactLogo} from '../../assets/logo.svg';

export default function Verify() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const {state} = useLocation();
  const email = state ? state.email : '';

  useEffect(() => {
    if (email === '') {
      navigate('/login');
    }
    Hub.listen('auth', async ({payload}) => {
      const {event} = payload;
      if (event === 'autoSignIn') {
        navigate('/profile');
      } else if (event === 'autoSignIn_failure') {
        navigate('/login');
      }
    });
  } );


  async function confirmSignUp(code) {
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Invalid verification code provided, please try again.');
    }
  }

  return (
    <>
      <Container maxWidth={'sm'} component="main"
        sx={{
          minHeight: '100vh', display: 'flex', justifyContent: 'center',
          flexDirection: 'column',
          marginY: 5,
        }}>
        <Link to={'/'}>
          <Box>
            <ReactLogo/>
          </Box>
        </Link>
        <VerificationCode email={email} onSubmit={confirmSignUp}/>
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
