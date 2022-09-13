import React, {useEffect, useState} from 'react';
import getCurrentJwt from '../../auth/CognitoService';
import Loading from '../public/Loading';
import {Card, CardActionArea, CardMedia, Container, IconButton, Step, StepLabel, Stepper} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Alert from '../public/Util';
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom';
import {ChessProfileForm, ProfileForm} from './Profile';
import {getCurrentUser, updateUser} from '../../api/user';
import {createRepertoire, deleteRepertoire, getRepertoireInfo} from '../../api/repertoire';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Repertoires() {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [colorSelected, setColorSelected] = useState(null);
  const [created, setCreated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const initialData = {
    total: 0,
    last_updated: '',
  };

  const [whiteRepertoire, setWhiteRepertoire] = useState(initialData);
  const [blackRepertoire, setBlackRepertoire] = useState(initialData);


  useEffect(() => {
    getCurrentJwt().then((jwt) => {
      setAccessToken(jwt);
      getRepertoireInfo(jwt)
          .then((info)=>{
            if (Object.keys(info.data.white).length > 0) {
              setWhiteRepertoire(info.data.white);
            }
            if (Object.keys(info.data.black).length > 0) {
              setBlackRepertoire(info.data.black);
            }
            setLoaded(true);
          })
          .catch((error) => setErrorMessage(error.message))
          .finally(()=>setLoading(false));
    });
  }, [created]);

  const repertoireCreated = () => {
    setColorSelected(null);
    setCreated(true);
  };

  const handleClick = (color) => {
    if (color === 'white') {
      if (whiteRepertoire.total === 0) {
        setColorSelected('white');
      } else {
        navigate('/repertoire/white');
      }
    } else if (color === 'black') {
      if (blackRepertoire.total === 0) {
        setColorSelected('black');
      } else {
        navigate('/repertoire/black');
      }
    }
  };

  const deleteUserRepertoire = (color) => {
    setLoading(true);
    deleteRepertoire(accessToken, color).then(() => {
      if (color === 'white') {
        setWhiteRepertoire(initialData);
      } else {
        setBlackRepertoire(initialData);
      }
    }).catch((error) => setErrorMessage(error.message)).finally(() => setLoading(false));
  };

  return (
    <>
      <Container component="main">
        <Typography variant="h3" mt={5}>
          My repertoires
        </Typography>
        <Grid container spacing={2} mt={6} justifyContent={'space-around'}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} mb={3}>
              <Typography gutterBottom variant="h4" component="div">
                White
              </Typography>
            </Box>
            <Card elevation={10} sx={{
              ':hover': {
              },
              'mb': 2,
            }}>
              <CardActionArea onClick={() => handleClick('white')}>
                <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                  <img src="/white_initial.svg"/>
                </CardMedia>
              </CardActionArea>
            </Card>
            {loaded && <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography gutterBottom variant="body1" component="div">
                  {whiteRepertoire.total} moves
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  Last updated: {whiteRepertoire.last_updated && new Date(whiteRepertoire.last_updated).toDateString()}
                </Typography>
              </Box>
              { whiteRepertoire.total > 0 &&
                <IconButton color="error" size={'large'} onClick={() => deleteUserRepertoire('white')}>
                  <DeleteIcon />
                </IconButton>
              }

            </Box>
            }
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} mb={3}>
              <Typography gutterBottom variant="h4" component="div">
                Black
              </Typography>
            </Box>
            <Card elevation={10} sx={{
              ':hover': {
              },
              'mb': 3,
            }}>
              <CardActionArea onClick={() => handleClick('black')}>
                <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                  <img src="/black_initial.svg"/>
                </CardMedia>
              </CardActionArea>
            </Card>
            {loaded && <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography gutterBottom variant="body1" component="div">
                  {blackRepertoire.total} moves
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  Last updated: {blackRepertoire.last_updated && new Date(blackRepertoire.last_updated).toDateString()}
                </Typography>
              </Box>
              { blackRepertoire.total > 0 &&
                <IconButton color="error" size={'large'} onClick={() => deleteUserRepertoire('black')}>
                  <DeleteIcon />
                </IconButton>
              }

            </Box>
            }
          </Grid>
        </Grid>
        {colorSelected != null &&
          <RepertoireStepper colorSelected={colorSelected} repertoireCreated={repertoireCreated}
            accessToken={accessToken}/>
        }

      </Container>
      {loading && <Loading/>}
      <Snackbar open={created} autoHideDuration={4000} onClose={()=>setCreated(false)}>
        <Alert onClose={()=>setCreated(false)} severity="success" sx={{width: '100%', fontSize: 16}}>
          Repertoire created correctly!
        </Alert>
      </Snackbar>
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="error" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>


  );
}

function RepertoireStepper({colorSelected, repertoireCreated, accessToken}) {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const steps = ['Complete profile', 'Complete chess profile', 'Create repertoire'];
  const [activeStep, setActiveStep] = useState(0);
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
    if (!loaded) {
      getCurrentUser(accessToken)
          .then((user)=>{
            setLoaded(true);
            setUserProfile(user.data.user);
            setChessStyle(user.data.style);
          })
          .catch((error) => setErrorMessage(error.message))
          .finally(()=>setLoading(false));
    }
    if (activeStep === steps.length) {
      setLoading(true);
      updateUser(accessToken, userProfile, chessStyle)
          .then(() => {
            createRepertoire(accessToken, colorSelected)
                .then(() => repertoireCreated())
                .catch((error) => setErrorMessage(error.message))
                .finally(()=>setLoading(false));
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setLoading(false);
          });
    }
  }, [activeStep]);


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ProfileForm userProfile={userProfile} updateUserProfile={updateUserProfile}/>;
      case 1:
        return <ChessProfileForm chessStyle={chessStyle} updateChessStyle={updateChessStyle}/>;
      case 2:
        return (
          <>
            <Typography sx={{mt: 2, mb: 1}}>
              Review
            </Typography>
          </>);
      case 3:
        return (
          <>
            <Typography sx={{mt: 2, mb: 1}}>
              Creating the opening repertoire
            </Typography>
          </>);
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <Container sx={{my: 6}}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h1" variant="h4" align="center" m={2}>
            Create {colorSelected} repertoire
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            },
            )}
          </Stepper>
          <>
            {getStepContent(activeStep)}
            {activeStep < steps.length &&
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{mr: 1}}
              >
                Back
              </Button>
              <Box sx={{flex: '1 1 auto'}}/>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
            }
          </>
        </Paper>
      </Container>
      {loading && <Loading/>}
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="error" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

RepertoireStepper.propTypes = {
  colorSelected: PropTypes.string,
  repertoireCreated: PropTypes.func,
  accessToken: PropTypes.string,
};


