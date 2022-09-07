import {Step, StepLabel, Stepper} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, {useState} from 'react';
import Profile from './Profile';
import StyleGrid from './Style';

export default function NewRepertoire() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Profile', 'Playing style', 'Custom'];


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Profile />;
      case 1:
        return <StyleGrid aggressive={user.risk} fashion={user.fashion} popular={user.popularity} handleChange={handleChange}/>;
      case 2:
        return <Profile />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{mt: 3, ml: 1}}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </>
    </>
  );
}

