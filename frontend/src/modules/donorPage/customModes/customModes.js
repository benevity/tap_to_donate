import { React, useState,useEffect } from "react";
import HorizontalLinearStepperMode12 from "../../../components/stepper/HorizontalLinearStepperMode12";
import HorizontalLinearStepperMode3 from "../../../components/stepper/HorizontalLinearStepperMode3";
import CauseCard from "../../../components/cause-card/CauseCard";
import DonationPage from "../../../components/stepper-pages/donation-page/DonationPage"
import ReceiptInfoPage from "../../../components/stepper-pages/receipt-info-page/ReceiptInfoPage";
import SummaryPage from "../../../components/stepper-pages/summary/SummaryPage";
import SuccessfulCustomDonation from "../../../components/pop-up-pages/SuccessfulCustomDonation";
import DonationFailed from "../../../components/pop-up-pages/DonationFailed";
import LoadingPage from "../../../components/pop-up-pages/LoadingPage";
import TapToDonate from "../../../components/tap-to-donate/TapToDonate";
import SearchPage from "../../../components/stepper-pages/search/SearchPage";

import * as benevityServices from "../../../services/benevityServices";
import { Slide } from "@mui/material";
import SimpleTopHeader from "../../../components/top-header/simple-top-header";

export default function CustomModes({
    operating_mode,
    client, setClient,
    donationData, setDonationData,
    causeInfo, setCauseInfo,
    selectedAmountButton, setSelectedAmountButton,
    donateButtonHandler, cancelDonationButtonHandler,
    activeStep, setActiveStep,
    showTapToDonate, setshowtaptodonate,
}) {

    const [causes, setCauses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const stepTitles_Mode1 = ['Receipt Info', 'Summary'];
    const stepTitles_Mode2 = ['Donation Amount', 'Receipt Info', 'Summary'];
    const stepTitles_Mode3 = ['Search for Cause', 'Donation Amount', 'Receipt Info', 'Summary'];
    const steps_Mode1 = [
        <ReceiptInfoPage donationData={donationData} setDonationData={setDonationData}></ReceiptInfoPage>,
        <SummaryPage donationData={donationData} causeInfo={causeInfo}></SummaryPage>,
    ];
    const steps_Mode2 = [
        <DonationPage donationData={donationData} setDonationData={setDonationData} selectedAmountButton={selectedAmountButton} setSelectedAmountButton={setSelectedAmountButton}></DonationPage>,
        <ReceiptInfoPage donationData={donationData} setDonationData={setDonationData}></ReceiptInfoPage>,
        <SummaryPage donationData={donationData} causeInfo={causeInfo}></SummaryPage>,
    ];
    const steps_Mode3 = [
        <SearchPage setIsLoading={setIsLoading} causes={causes} setCauses={setCauses} setDonationCause={setDonationCause}></SearchPage>,
        <DonationPage donationData={donationData} setDonationData={setDonationData} selectedAmountButton={selectedAmountButton} setSelectedAmountButton={setSelectedAmountButton}></DonationPage>,
        <ReceiptInfoPage donationData={donationData} setDonationData={setDonationData}></ReceiptInfoPage>,
        <SummaryPage donationData={donationData} causeInfo={causeInfo}></SummaryPage>,
    ];
    async function setDonationCause(recipient_id, recipient_name) {
        setIsLoading(true);
        setDonationData({ ...donationData, recipientId: recipient_id, recipient_name: recipient_name })
        setActiveStep(1);
        const causeInf = await benevityServices.getCauseInfo(recipient_id)
        setCauseInfo(causeInf);
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <LoadingPage></LoadingPage>}
            {(causeInfo != undefined && !showTapToDonate && operating_mode != 3) && <CauseCard causeInfo={causeInfo} setCauseInfo={setCauseInfo}></CauseCard>}

            {!showTapToDonate && operating_mode == 1 &&
                <HorizontalLinearStepperMode12
                    stepTitles={stepTitles_Mode1}
                    steps={steps_Mode1}
                    handleDonate={donateButtonHandler}
                    cancelDonationButtonHandler={cancelDonationButtonHandler}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    donationData={donationData}
                    setDonationData={setDonationData}
                ></HorizontalLinearStepperMode12>
            }
            {!showTapToDonate && operating_mode == 2 &&
                <HorizontalLinearStepperMode12
                    stepTitles={stepTitles_Mode2}
                    steps={steps_Mode2}
                    handleDonate={donateButtonHandler}
                    cancelDonationButtonHandler={cancelDonationButtonHandler}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    donationData={donationData}
                    setDonationData={setDonationData}
                ></HorizontalLinearStepperMode12>
            }
            {(causeInfo != undefined && activeStep != 0 && !showTapToDonate && operating_mode == 3) && <CauseCard causeInfo={causeInfo} setCauseInfo={setCauseInfo}></CauseCard>}
            {!showTapToDonate && operating_mode == 3 && 
                <HorizontalLinearStepperMode3
                    stepTitles={stepTitles_Mode3}
                    steps={steps_Mode3}
                    handleDonate={donateButtonHandler}
                    cancelDonationButtonHandler={cancelDonationButtonHandler}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    donationData={donationData}
                    setDonationData={setDonationData}
                ></HorizontalLinearStepperMode3>
            }
            <div>
                {(client.donationStatus == "succeeded") && <SuccessfulCustomDonation donationData={donationData} client={client} setClient={setClient} setshowtaptodonate={setshowtaptodonate}></SuccessfulCustomDonation>}
                {(client.donationStatus == "failed") && <DonationFailed donationData={donationData} client={client} setClient={setClient}></DonationFailed>}
            </div>
        </>
    )
}