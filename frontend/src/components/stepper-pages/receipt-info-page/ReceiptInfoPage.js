import React from "react";
import { countryList, canadaProvinces, usStates } from "../Country-StateList";
import {Stack, Select, Typography, Box, TextField, InputLabel, FormControl, MenuItem } from "@mui/material";

function ReceiptInfoPage({ donationData, setDonationData }) {
  return (
    <>
      <Typography variant="body1"> Please fill out the form in order to receive donation receipt, otherwise click Annonymous Donation.</Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
      >
        <h3>Personal Information</h3>
        <Stack direction="row" justifyContent={"space-between"} spacing={2}>
          <TextField
            sx={{ width: "100%" }}
            required
            variant="outlined"
            type="text"
            label="Full Name"
            value={donationData.fullName}
            onChange={(e) => { setDonationData({ ...donationData, fullName: e.target.value }); }}
          />
          <TextField
            sx={{ width: "100%" }}
            required
            variant="outlined"
            type="text"
            label="Email"
            value={donationData.email}
            onChange={(e) => { setDonationData({ ...donationData, email: e.target.value }); }}
          />
        </Stack>


        <h3>Address</h3>
        <Stack direction="row" justifyContent={"space-between"} spacing={2}>
          <TextField
            sx={{ width: "100%" }}
            required
            variant="outlined"
            type="text"
            label="Line 1"
            value={donationData.line1}
            onChange={(e) => { setDonationData({ ...donationData, line1: e.target.value }); }}
          />
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            type="text"
            label="Line 2"
            value={donationData.line2}
            onChange={(e) => { setDonationData({ ...donationData, line2: e.target.value }); }}
          />
        </Stack>

        <Stack direction="row" justifyContent={"space-between"} spacing={2}>
          <TextField
            sx={{ width: "100%" }}
            required
            variant="outlined"
            type="text"
            label="City"
            value={donationData.city}
            onChange={(e) => { setDonationData({ ...donationData, city: e.target.value }); }}
          />
          <FormControl
            sx={{ width: "70%" }}
          >
            <InputLabel>Country</InputLabel>
            <Select
              required
              variant="outlined"
              label="Country"
              value={donationData.country}
              onChange={(e) => { setDonationData({ ...donationData, country: e.target.value, state: "", zip: "" }); }}
            >
              {Object.entries(countryList).map(([key, value]) => { return <MenuItem key={key} value={value}>{value}</MenuItem> })}
            </Select>
          </FormControl>
          <FormControl
            sx={{ width: "100%" }}
          >
            <InputLabel>{donationData.country == "Canada" ? "Province" : "State"}</InputLabel>
            <Select
              required
              disabled={donationData.country == ""}
              variant="outlined"
              label="State"
              value={donationData.state}
              onChange={(e) => { setDonationData({ ...donationData, state: e.target.value }); }}
            >
              {donationData.country == "Canada"
                ?
                Object.entries(canadaProvinces).map(([key, value]) => { return <MenuItem key={key} value={key}>{value}</MenuItem> })
                :
                Object.entries(usStates).map(([key, value]) => { return <MenuItem key={key} value={key}>{value}</MenuItem> })
              }
            </Select>
          </FormControl>
        </Stack>

        <TextField
          required
          disabled={donationData.country == ""}
          variant="outlined"
          type="text"
          label={donationData.country == "Canada" ? "Postal Code" : "Zip"}
          value={donationData.zip}
          onChange={(e) => { setDonationData({ ...donationData, zip: e.target.value }); }}
        />
      </Box>
    </>
  )
}

export default ReceiptInfoPage; 