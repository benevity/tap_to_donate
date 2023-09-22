import * as React from 'react';
import Box from '@mui/material/Box';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
function SummaryPage({ donationData, causeInfo }) {

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      {(donationData.anonymous) && (
        <div>
          <CardHeader
            title="Anonymous Donation"
          >
          </CardHeader>
        </div>
      )}
      <CardContent>
        <Typography variant="h2">
          {"$ " + donationData.amount / 100}
        </Typography>
      </CardContent>
      {!(donationData.anonymous) && (
        <div>
          <CardHeader
            title="Donor's Information"
          />
          <CardContent>
            <Typography variant="body1">
              {donationData.fullName}
              <br></br>
              {donationData.email}
              <br></br>
              {donationData.line1}
              {" "}
              {(donationData.line2 != "") && donationData.line2}
              <br></br>
              {donationData.city}
              {" "}
              {donationData.state}
              {" "}
              {donationData.zip}
              {" "}
              {donationData.country}
            </Typography>
          </CardContent>
        </div>
      )}
      <CardHeader title="FTC notice"></CardHeader>
      <CardContent>
        <Typography sx={{ fontStyle: 'italic' }}>
          {`Your donation will be made to Canadian Online Giving Foundation, 
          registered in Canada, with a recommendation that they
          make a grant to the corresponding to the ${donationData.recipient_name} listed above.
          ${donationData.recipient_name} will receive your donation, less fees. Donations are
          non-refundable.`}
        </Typography>
      </CardContent>
    </Box>
  )
}
export default SummaryPage;