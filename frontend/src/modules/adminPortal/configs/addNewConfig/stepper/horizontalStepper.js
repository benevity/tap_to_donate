import * as React from 'react';
import {Box, Stepper,Step,Button, StepLabel} from "@mui/material"
import { ButtonsWrapper } from '../../../../../styles/wrapper-components';


export default function HorizontalStepper({ stepTitles, steps, handleCreate }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    if(activeStep>0){
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {stepTitles.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {steps[activeStep]}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <ButtonsWrapper><Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            variant ='contained'
          >
          Back 
          </Button></ButtonsWrapper>
          <Box sx={{ flex: '1 1 auto' }} />
          {(activeStep === stepTitles.length - 1)
            ? <ButtonsWrapper><Button variant="contained"  onClick={handleCreate}>Create</Button></ButtonsWrapper>
            : <ButtonsWrapper><Button variant='contained' onClick={handleNext}>Next</Button></ButtonsWrapper>}

        </Box>
      </React.Fragment>
    </Box>
  );
}