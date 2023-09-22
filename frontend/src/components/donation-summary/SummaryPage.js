import * as React from 'react';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
function SummaryPage({ donationData ,causeInfo}) {

  return (
    <Box
    >
      {(donationData.anonymous) && (
      <CardHeader title="Anonymous Donation" ></CardHeader>
      )}
      <CardContent >
        <Typography variant="h2">
          {"$ "+donationData.amount/100}
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
    </Box>
  )
}
export default SummaryPage;