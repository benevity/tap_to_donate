import React, { useState } from 'react';
import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from "@mui/material/TextField";

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "@mui/material/Button"
function DonationPage({ donationData, setDonationData, selectedAmountButton, setSelectedAmountButton }) {

  function customAmountHandler(event) {
    setDonationData({ ...donationData, amount: event.target.value * 100 })
  }

  function buttonHandler(event, newSelectedAmountButton) {
    if (newSelectedAmountButton !== null) {
      setSelectedAmountButton(newSelectedAmountButton);

      switch (newSelectedAmountButton) {
        case 1:
          setDonationData({ ...donationData, amount: 100 })
          break;

        case 2:
          setDonationData({ ...donationData, amount: 500 })
          break;

        case 3:
          setDonationData({ ...donationData, amount: 1000 })
          break;

        case 4:
          setDonationData({ ...donationData, amount: 2000 })
          break;

        case 5:
          // setDonationData({ ...donationData, amount: "" })
          break;
      }

    }
  }

  return (
      <div>

      <Box
        style={{ display: 'flex', justifyContent: 'center', }}
      >
        {/* <FormControl>
        <FormLabel id="demo-customized-radios">Select Donation Amount</FormLabel>
      </FormControl> */}
        <ToggleButtonGroup
          size="large"
          sx={{
            p: 1, boxShadow: 1,
          }}

          color="primary"
          value={selectedAmountButton}
          exclusive
          onChange={buttonHandler}
        >
          <ToggleButton
            sx={{ minHeight: 100, minWidth: 100 }}
            value={1}>
            $1
          </ToggleButton>
          <ToggleButton
            sx={{ minHeight: 100, minWidth: 100 }}
            value={2}>

            $5
          </ToggleButton>
          <ToggleButton
            sx={{ minHeight: 100, minWidth: 100 }}
            value={3}>
            $10
          </ToggleButton>
          <ToggleButton
            sx={{ minHeight: 100, minWidth: 100 }}
            value={4}>
            $20
          </ToggleButton>
          <ToggleButton
            value={5}
          >
            {/* <Box> */}
            Custom
            {/* <br></br>
          {(selection==5)&&<OutlinedInput
            sx={{maxWidth:80,maxHeight:40}}
            // id="outlined-adornment-amount"
            value={donationData.amount}
            onChange={amountHandler}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />} */}
            {/*   </Box> */}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <h3> Please enter custom amount</h3> */}
      </Box>
      <Box
        style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}
      >
        {(selectedAmountButton == 5) &&
          <>
            <h3> Please enter custom amount:  </h3>
            <br></br>
            <OutlinedInput
              // id="outlined-adornment-amount"
              value={donationData.amount / 100}
              onChange={customAmountHandler}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </>

        }

      </Box>
      </div>
  );
}

export default DonationPage;