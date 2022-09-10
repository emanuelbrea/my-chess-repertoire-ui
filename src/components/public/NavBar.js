import {AppBar, Container, Stack, Toolbar} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import React, {useContext} from 'react';
import {UserContext} from '../../routes/PrivateRoute';

export default function NavBar() {
  const user = useContext(UserContext);
  return (
    <AppBar position={'static'} color="transparent" elevation={0}>
      <Container sx={{mt: 3}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Box
            component="a"
            href="/">
            <img src="/logo.svg" height={70}/>
          </Box>


          <Stack direction="row" spacing={2} sx={{display: {xs: 'none', md: 'flex'}}}>
            <Link to="/" style={{textDecoration: 'none'}}>
              <Button variant={'text'}
                sx={{
                  ':hover': {
                    textDecoration: 'underline #769656',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '10px',
                    backgroundColor: 'transparent',
                  },
                  'fontSize': 18,
                  'color': 'black',
                  'textTransform': 'none',
                }}
              >
                Home
              </Button>
            </Link>
            <Link to="/about" style={{textDecoration: 'none'}}>
              <Button variant={'text'}
                sx={{
                  ':hover': {
                    textDecoration: 'underline #769656',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '10px',
                    backgroundColor: 'transparent',
                  },
                  'fontSize': 18,
                  'color': 'black',
                  'textTransform': 'none',
                }}
              >
              About
              </Button>
            </Link>
            <Link to="/contact" style={{textDecoration: 'none'}}>
              <Button variant={'text'}
                sx={{
                  ':hover': {
                    textDecoration: 'underline #769656',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '10px',
                    backgroundColor: 'transparent',
                  },
                  'fontSize': 18,
                  'color': 'black',
                  'textTransform': 'none',
                }}
              >
              Contact
              </Button>
            </Link>
            {user && <Link to="/repertoires" style={{textDecoration: 'none'}}>
              <Button variant={'text'}
                sx={{
                  ':hover': {
                    textDecoration: 'underline #769656',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '10px',
                    backgroundColor: 'transparent',
                  },
                  'fontSize': 18,
                  'color': 'black',
                  'textTransform': 'none',
                }}
              >
                Repertoires
              </Button>
            </Link>}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link to="/login" style={{textDecoration: 'none'}}>
              <Button sx={{
                ':hover': {
                  textDecoration: 'underline #769656',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '10px',
                  backgroundColor: 'transparent',
                },
                'textTransform': 'none', 'mr': 2, 'fontSize': 18, 'color': 'black',
              }} size="large">
                                Log in
              </Button>
            </Link>
            <Link to="/register" style={{textDecoration: 'none'}}>
              <Button sx={{
                ':hover': {
                  border: '2px solid #769656',
                },
                'textTransform': 'none', 'fontSize': 18, 'color': 'black', 'border': '2px solid #769656',
              }} variant="outlined" size="large">
                                Sign up
              </Button>
            </Link>
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
