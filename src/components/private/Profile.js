import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StyleGrid from './Style';
import NavBarLogged from './NavBarLogged';
import getCurrentJwt from '../../auth/CognitoService';
import Loading from '../public/Loading';
import Alert from '../public/Util';
import Snackbar from '@mui/material/Snackbar';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    rating: 0,
    popularity: 0,
    risk: 0,
    fashion: 0,
  });


  useEffect(() => {
    getCurrentJwt().then((jwt) => {
      setAccessToken(jwt);
      getCurrentUser(jwt);
    });
  }, []);

  const getCurrentUser = useCallback(async (jwt) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json',
      },
    };
    const user = await fetch('http://localhost:5000/api/user', requestOptions)
        .then((res) => res.json())
        .catch((error) => {
          return null;
        });
    setUser(user.data);
    setLoading(false);
    return user;
  }, []);

  const updateUser = async (user) => {
    setLoading(true);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        popularity: user.popularity,
        fashion: user.fashion,
        risk: user.risk,
        rating: user.rating,
      }),
    };
    await fetch('http://localhost:5000/api/user', requestOptions)
        .then((res) => res.json())
        .catch((error) => {
          return null;
        });
    setLoading(false);
    setOpen(true);
  };

  const [unrated, setUnrated] = useState(false);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <NavBarLogged/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <form
            autoComplete="off"
            noValidate
          >
            <Card sx={{my: 3}}>
              <CardHeader
                title="Profile"
              />
              <Divider/>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      helperText="Please specify the first name"
                      label="First name"
                      name="first_name"
                      onChange={handleChange}
                      required
                      value={user.first_name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Last name"
                      name="last_name"
                      onChange={handleChange}
                      required
                      value={user.last_name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      required
                      value={user.email}
                      variant="outlined"
                      disabled={true}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                      <TextField
                        label="FIDE rating"
                        name="rating"
                        onChange={handleChange}
                        required
                        type="number"
                        value={user.rating}
                        variant="outlined"
                        InputProps={{
                          inputProps: {
                            max: 2800, min: 0,
                          },
                        }}
                        sx={{paddingRight: 2, minWidth: 140}}
                        disabled={unrated === true}
                      />
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox
                            onChange={(event) => {
                              setUser({
                                ...user,
                                ['rating']: 0,
                              });
                              setUnrated(event.target.checked);
                            }
                            }
                          />}
                          label="Unrated"/>
                      </FormGroup>
                    </Box>

                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                title="Playing style"
              />
              <Divider/>
              <CardContent>
                <StyleGrid aggressive={user.risk} fashion={user.fashion} popular={user.popularity} handleChange={handleChange}/>

              </CardContent>
              <Divider/>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={()=> updateUser(user)}
                >
                                    Save details
                </Button>
              </Box>
            </Card>
          </form>

        </Container>
      </Box>
      {loading && <Loading/>}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontSize: 16}}>
          Profile updated correctly!
        </Alert>
      </Snackbar>
    </>


  );
}
