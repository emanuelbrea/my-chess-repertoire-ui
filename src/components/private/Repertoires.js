import React, {useEffect, useState} from 'react';
import getCurrentJwt from '../../auth/CognitoService';
import Loading from '../public/Loading';
import {Card, CardActionArea, CardContent, CardMedia, Container, Step, StepLabel, Stepper} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Alert from '../public/Util';
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom';
import {ChessProfileForm, ProfileForm} from './Profile';
import {getCurrentUser, updateUser} from '../../api/user';
import {createRepertoire, getRepertoireInfo} from '../../api/repertoire';

export default function Repertoires() {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [colorSelected, setColorSelected] = useState(null);
  const [created, setCreated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [whiteRepertoire, setWhiteRepertoire] = useState({
    total: 0,
    last_updated: '',
  });
  const [blackRepertoire, setBlackRepertoire] = useState({
    total: 0,
    last_updated: '',
  });


  useEffect(() => {
    getCurrentJwt().then((jwt) => {
      setAccessToken(jwt);
      getRepertoireInfo(jwt)
          .then((info)=>{
            if (Object.keys(info.data.white).length > 0 > 0) {
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


  return (
    <>
      <Container component="main">
        <Grid container spacing={6} mt={6} justifyContent={'center'}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card elevation={10} sx={{
              ':hover': {
                boxShadow: 20,
              },
              'display': 'flex',
              'height': '100%',
              'flexDirection': 'column',
            }}>
              <CardActionArea onClick={() => handleClick('white')}>
                <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                  <AddCircleIcon sx={{color: '#769656', mt: 5, fontSize: 100}}/>
                </CardMedia>
                <CardContent>
                  <Box display={'flex'} justifyContent={'center'} flexDirection={'row'}>
                    <Typography gutterBottom variant="h4" component="div">
                      White
                    </Typography>
                  </Box>
                  {loaded && <Typography gutterBottom variant="body1" component="div">
                    {whiteRepertoire.total} moves
                  </Typography>}
                  {loaded && <Typography gutterBottom variant="body1" component="div">
                    Last updated: {whiteRepertoire.last_updated}
                  </Typography>}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card elevation={10} sx={{
              ':hover': {
                boxShadow: 20,
              },
              'display': 'flex',
              'height': '100%',
              'flexDirection': 'column',
            }}>
              <CardActionArea onClick={() => handleClick('black')}>
                <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                  <AddCircleIcon sx={{color: '#769656', mt: 5, fontSize: 100}}/>
                </CardMedia>
                <CardContent>
                  <Box display={'flex'} justifyContent={'center'} flexDirection={'row'}>
                    <Typography gutterBottom variant="h4" component="div">
                      Black
                    </Typography>
                  </Box>

                  {loaded && <Typography gutterBottom variant="body1" component="div">
                    {blackRepertoire.total} moves
                  </Typography>}
                  {loaded && <Typography gutterBottom variant="body1" component="div">
                    Last updated: {blackRepertoire.last_updated}
                  </Typography>}
                </CardContent>
              </CardActionArea>
            </Card>
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
                .catch((error) => setErrorMessage(error.message));
          })
          .catch((error) => setErrorMessage(error.message))
          .finally(()=>setLoading(false));
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

