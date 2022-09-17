import * as React from 'react';
import {useEffect, useState} from 'react';
import {Container, Divider, Stack, TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import getCurrentJwt from '../../auth/CognitoService';
import Loading from '../public/Loading';
import Alert from '../public/Util';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import FortIcon from '@mui/icons-material/Fort';
import Slider from '@mui/material/Slider';
import Icon from '@mdi/react';
import {mdiSwordCross} from '@mdi/js';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import MergeIcon from '@mui/icons-material/Merge';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ComputerIcon from '@mui/icons-material/Computer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {getCurrentUser, updateUser} from '../../api/user';
import Tooltip from '@mui/material/Tooltip';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [userProfile, setUserProfile] = useState({
    first_name: 0,
    last_name: 0,
    email: 0,
    age: 0,
    playing_since: 0,
  });

  const [chessStyle, setChessStyle] = useState({
    rating: 0,
    popularity: 0,
    risk: 0,
    fashion: 0,
  });


  useEffect(() => {
    getCurrentJwt().then((jwt) => {
      setAccessToken(jwt);
      getCurrentUser(jwt).then((user) => {
        setUserProfile(user.data.user);
        setChessStyle(user.data.style);
        setLoading(false);
      }).catch((error) => setErrorMessage(error.message))
          .finally(() => setLoading(false));
    });
  }, []);

  const updateUserProfile = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const updateChessStyle = (event) => {
    setChessStyle({
      ...chessStyle,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updateUserInfo = async (accessToken, userProfile, chessStyle) => {
    setLoading(true);
    updateUser(accessToken, userProfile, chessStyle)
        .then(() => setOpen(true))
        .catch((error) => (setErrorMessage(error.message)))
        .finally(() => setLoading(false));
  };

  return (
    <>
      <Container component={'main'} sx={{my: 6, mt: 15}}>
        <Paper variant="outlined" sx={{p: {xs: 2, md: 3}}}>
          <ProfileForm userProfile={userProfile} updateUserProfile={updateUserProfile}/>
          <Divider sx={{my: 3}}/>
          <ChessProfileForm chessStyle={chessStyle} updateChessStyle={updateChessStyle}/>
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
              onClick={() => updateUserInfo(accessToken, userProfile, chessStyle)}
            >
              Save details
            </Button>
          </Box>
        </Paper>
      </Container>
      {loading && <Loading/>}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontSize: 16}}>
          Profile updated correctly!
        </Alert>
      </Snackbar>
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>


  );
}

export function ProfileForm({userProfile, updateUserProfile}) {
  return (
    <>
      <Typography variant="h5" gutterBottom mb={3}>
        Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid
          item
          md={6}
          xs={12}
          sm={6}
        >
          <TextField
            fullWidth
            helperText="Please specify the first name"
            label="First name"
            name="first_name"
            onChange={updateUserProfile}
            required
            value={userProfile.first_name}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sm={6}
        >
          <TextField
            fullWidth
            label="Last name"
            name="last_name"
            onChange={updateUserProfile}
            required
            value={userProfile.last_name}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sm={6}
        >
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            onChange={updateUserProfile}
            required
            value={userProfile.email}
            variant="outlined"
            disabled={true}
          />
        </Grid>
        <Grid
          item
          md={3}
          xs={6}
          sm={3}
        >
          <TextField
            fullWidth
            label="Age"
            name="age"
            onChange={updateUserProfile}
            required
            value={userProfile.age}
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: {
                max: 110, min: 0,
              },
            }}

          />
        </Grid>
        <Grid
          item
          md={3}
          xs={6}
          sm={3}
        >
          <TextField
            fullWidth
            label="Playing since"
            helperText="At what age you started playing chess"
            name="playing_since"
            onChange={updateUserProfile}
            required
            value={userProfile.playing_since}
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: {
                max: userProfile.age, min: 0,
              },
            }}
          />
        </Grid>

      </Grid>
    </>
  );
}

ProfileForm.propTypes = {
  userProfile: PropTypes.object,
  updateUserProfile: PropTypes.func,
};

export function ChessProfileForm({chessStyle, updateChessStyle}) {
  const marks = [
    {
      value: 0,
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom mb={3}>
        Elo Rating
      </Typography>
      <TextField
        label="FIDE rating"
        name="rating"
        helperText="Official elo rating. Select 0 if unrated."
        onChange={updateChessStyle}
        required
        type="number"
        value={chessStyle.rating}
        variant="outlined"
        InputProps={{
          inputProps: {
            max: 2800, min: 0,
          },
        }}
        sx={{paddingRight: 2, minWidth: 140}}
      />
      <Divider sx={{my: 3}}/>
      <Typography variant="h5" gutterBottom mb={3}>
        Playing style
      </Typography>
      <Grid container spacing={1} my={5}>
        <Grid container item spacing={3}>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent={'space-between'}
              display={'flex'}>
              <Tooltip title={'You are a positional player that wants to minimize losses.'} arrow>
                <Typography gutterBottom variant={'h6'}>
                  Solid
                </Typography>
              </Tooltip>
              <FortIcon sx={{fontSize: 30}}/>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Slider
              aria-label="Aggressive"
              value={chessStyle.risk}
              onChange={updateChessStyle}
              min={-1}
              max={1}
              defaultValue={0}
              step={0.01}
              marks={marks}
              name={'risk'}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent={'space-between'}
              display={'flex'}>
              <Icon path={mdiSwordCross}
                title="Aggressive"
                size={1.2}
              />
              <Tooltip title={'You try to avoid draws and take more risks to go for the win.'} arrow>
                <Typography gutterBottom variant={'h6'}>
                  Aggressive
                </Typography>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>


        <Grid container item spacing={3}>
          <Grid item xs={4}>

            <Stack spacing={2} direction="row" alignItems="center" justifyContent={'space-between'}
              display={'flex'}>
              <Tooltip title={'You prefer lines that are less played to surprise your opponent.'} arrow>
                <Typography gutterBottom variant={'h6'}>
                  Side Lines
                </Typography>
              </Tooltip>
              <CallSplitIcon sx={{fontSize: 30}}/>
            </Stack>

          </Grid>
          <Grid item xs={4}>
            <Slider
              aria-label="Popular"
              value={chessStyle.popularity}
              onChange={updateChessStyle}
              min={-1}
              max={1}
              defaultValue={0}
              step={0.01}
              marks={marks}
              name={'popularity'}
            />
          </Grid>
          <Grid item xs={4}>

            <Stack spacing={2} direction="row" alignItems="center" justifyContent={'space-between'}
              display={'flex'}>
              <MergeIcon sx={{fontSize: 30}}/>
              <Tooltip title={'You prefer lines that are played more frequently that others.'} arrow>
                <Typography gutterBottom variant={'h6'}>
                  Main lines
                </Typography>
              </Tooltip>
            </Stack>

          </Grid>
        </Grid>


        <Grid container item spacing={3}>
          <Grid item xs={4}>

            <Stack spacing={2} direction="row" alignItems="center" justifyContent={'space-between'}
              display={'flex'}>
              <Tooltip title={'You prefer lines that used to be played a lot.'} arrow>
                <Typography gutterBottom variant={'h6'}>
                  Classical
                </Typography>
              </Tooltip>
              <MenuBookIcon sx={{fontSize: 30}}/>

            </Stack>

          </Grid>
          <Grid item xs={4}>
            <Slider
              aria-label="Fashion"
              value={chessStyle.fashion}
              onChange={updateChessStyle}
              min={-1}
              max={1}
              defaultValue={0}
              step={0.01}
              marks={marks}
              name={'fashion'}
            />
          </Grid>
          <Grid item xs={4}>

            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'}
              display={'flex'}>
              <ComputerIcon sx={{fontSize: 30}}/>
              <Tooltip title={'You prefer lines that became popular in the last years.'} arrow>
                <Typography gutterBottom variant={'h6'}>
                  Modern
                </Typography>
              </Tooltip>
            </Stack>

          </Grid>
        </Grid>
      </Grid>

    </>
  );
}

ChessProfileForm.propTypes = {
  chessStyle: PropTypes.object,
  updateChessStyle: PropTypes.func,
};
