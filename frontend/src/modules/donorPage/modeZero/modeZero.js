import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CauseCard from "../../../components/cause-card/CauseCard";
import SuccessfulAnonymousDonation from "../../../components/pop-up-pages/SuccessfulAnonymousDonation";
import DonationFailed from "../../../components/pop-up-pages/DonationFailed";
import FollowInstructions from "../../../components/pop-up-pages/FollowInstructions";
import SummaryPage from "../../../components/stepper-pages/summary/SummaryPage";
import {CenterWrapper} from "../../../styles/wrapper-components"
import SimpleTopHeader from "../../../components/top-header/simple-top-header";
function ModeZero({
    client, setClient,
    donationData, setDonationData,
    causeInfo, setCauseInfo,
    continuoslyCollectPayments,
    collectCustomPayment,
    config,
}) {
    let processing = false; // lock to stop collecting payment on other status changes
    useEffect(()=>{
        if(config.operating_mode==0 && processing ==false && client.terminal.getPaymentStatus()=='ready'){
            processing= true;
            collectCustomPayment();
            processing= false;
        }
    },[client.paymentStatus])

    return (
        <div >
            <SimpleTopHeader></SimpleTopHeader>
            <CenterWrapper>

            <Box
            sx={{width:800}}
            >
                {/* <Button onClick={()=>console.log(client.terminal.getPaymentStatus())}>Display popup</Button> */}
                {(causeInfo != undefined) && <CauseCard causeInfo={causeInfo} setCauseInfo={setCauseInfo}></CauseCard>}
                {(causeInfo != undefined) && <SummaryPage donationData={donationData}></SummaryPage>}
                {(causeInfo != undefined) && <FollowInstructions></FollowInstructions>}
                </Box>

                {/* SUCCEDED OR FAIELD POP UP---------------------------------------------------------------------------------------------------- */}
                <div>
                    {(client.donationStatus == "succeeded") && <SuccessfulAnonymousDonation donationData={donationData} client={client} setClient={setClient}></SuccessfulAnonymousDonation>}
                    {(client.donationStatus == "failed") && <DonationFailed donationData={donationData} client={client} setClient={setClient}></DonationFailed>}
                </div>
            </CenterWrapper>
        </div>
    )
}
export default ModeZero;