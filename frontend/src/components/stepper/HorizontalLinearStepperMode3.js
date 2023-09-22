import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ButtonsWrapper } from '../../styles/wrapper-components';

export default function HorizontalLinearStepperMode3({ 
    stepTitles, steps ,
    handleDonate,cancelDonationButtonHandler,
    activeStep, setActiveStep,
    donationData,setDonationData
}) {
  // const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === stepTitles.indexOf('Receipt Info');
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setDonationData({...donationData, anonymous:false})
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if(     activeStep==stepTitles.indexOf('Receipt Info')

            && donationData.fullName== ""
            && donationData.email== ""
            && donationData.line1== ""
            && donationData.city== ""
            && donationData.state== ""
            && donationData.country== ""
            && donationData.zip== ""
    )
    {
      alert("Please fill out information for receipt. Or click skip for an anonymous donation.")
    } else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setDonationData({...donationData, 
      anonymous:true,
    })
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleCancelDonation = () => {
    cancelDonationButtonHandler(); 
    setActiveStep(0);
  };
  function handleDonateClick(){
    handleDonate();
    handleNext();
  }

  return (
    <Box sx={{ width: 800 }}>
      <Stepper activeStep={activeStep}>
        {stepTitles.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === stepTitles.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 ,display:'flex',justifyContent:'center'}}>
          <br></br>
          Please follow the instructions on the pin pad to complete the donation. 
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <ButtonsWrapper><Button variant='contained' onClick={handleCancelDonation}>Cancel Donation</Button></ButtonsWrapper>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {steps[activeStep]}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {(activeStep!==0)
            ?
            <ButtonsWrapper><Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant='contained'
            >
              Back
            </Button></ButtonsWrapper>
            :null
          }
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <ButtonsWrapper><Button 
              color="inherit" 
              onClick={handleSkip} 
              sx={{ mr: 1 }}
              variant='contained'>
               Anonymous Donation 
              </Button></ButtonsWrapper>
            )}

          {(activeStep === stepTitles.length - 1)
            ? <ButtonsWrapper><Button variant="contained"  onClick={handleDonateClick}>Donate</Button></ButtonsWrapper>
            : (activeStep!=0)
              ? <ButtonsWrapper><Button variant='contained' onClick={handleNext}>Next</Button></ButtonsWrapper>
              :null
          }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}