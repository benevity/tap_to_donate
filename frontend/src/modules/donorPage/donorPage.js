import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as benevityServices from "../../services/benevityServices";
import * as dbAPI from "../../services/dbAPI"
import * as stripeClient from '../../services/stripeClient';
import ModeZero from "./modeZero/modeZero";
import CustomModes from "./customModes/customModes";
import {CenterWrapper } from "../../styles/wrapper-components";
import SimpleTopHeader from "../../components/top-header/simple-top-header";
import TapToDonate from "../../components/tap-to-donate/TapToDonate";
import { Slide } from "@mui/material";

export default function DonorPage() {
    const [client, setClient] = useState({
        status: "requires_initializing", // requires_connecting || reader_registration || workflows
        paymentIntentId: null,
        discoveredReaders: [],
        connectionStatus: "not_connected",//not_connected, connecting, connnected
        paymentStatus: '',//ready, not_ready, processing, waiting_for_intput
        donationStatus: '',//succeeded, failed
        processingPayment: false,
        selectedReader: null,
        workFlowInProgress: false,
        usingSimulator: true,
        testCardNumber: "4242424242424242",
        testPaymentMethod: "visa",
    })


    const { sn } = useParams();
    const [config, setConfig] = useState({});
    const [causeInfo, setCauseInfo] = useState(undefined);//detailed cause info
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAmountButton, setSelectedAmountButton] = useState(5);
    const [donationData, setDonationData] = useState({});
    const [showTapToDonate, setShowTapToDonate] = useState(true);
    let reconnectIntervalId;
    let reconnectIntervalTime = 20;//20 seconds

    let terminal;
    async function loadTerminal() {
        terminal = await stripeClient.loadAndInitializeStripeTerminal(unexpectedDisconnect);
        setClient({ ...client, terminal: terminal })
    }

    async function unexpectedDisconnect() {
        setActiveStep(0);
        setShowTapToDonate(true);
        // alert("Stripe reader disconnected")
        console.log("Stripe reader disconnected")
        console.log(client);
        // Attemp to connect after every couple of seconds (reconnectIntervalTime)
        reconnectIntervalId = setInterval(async function () {
            try {
                console.log("Trying to reconnect to reader (every " + reconnectIntervalTime + " seconds)");
                // await loadTerminal();
                await establishCardReaderConnection(sn);
                console.log(client.terminal.getConnectionStatus());
                if (client.terminal.getConnectionStatus() == "connected") {
                    console.log("Reader reconected")
                    clearInterval(reconnectIntervalId);
                }
            } catch (error) {
                console.log("Cannot reconnect, will try again in " + reconnectIntervalTime + " seconds.");
            }
            // if (isCardReaderConnected(terminal)) {
            //   console.log("Reader Connected. Reconnect interval reset.");
            //   clearInterval(reconnectIntervalId);
            //   await resumePayment();
            // }
        }, reconnectIntervalTime * 1000);
    }

    // connect to the reader --------------------------------------------------
    const establishCardReaderConnection = async (sn) => {

        let discoverResult;
        let enableSimulatedReader = { simulated: false };
        let selectedReader;
        console.log("79.Establishing connection with reader...")
        console.log("80.conectionStatus: " + client.terminal.getConnectionStatus())
        if (client.terminal.getConnectionStatus() == 'not_connected') {
            console.log(`Establishing connetion with Stripe reader S/N: ${sn}...`)
            try {
                //find all readers.client
                discoverResult = await client.terminal.discoverReaders(enableSimulatedReader);
                //interate through list of reader and select one with mathcing SN
                discoverResult.discoveredReaders.forEach(reader => {
                    if (reader.serial_number == sn.toUpperCase()) {
                        selectedReader = reader;
                        setClient({ ...client, selectedReader: reader })
                    }
                })
                //connclient.ect to reader with specified sn
                await client.terminal.connectReader(selectedReader);
                if (client.terminal.getConnectionStatus() == "connected") {
                    setClient({ ...client, paymentStatus: client.terminal.getPaymentStatus() })
                    console.log(`Connected to ${selectedReader.label}`);
                } else {
                    console.log("Not able to connect to reader. Make sure reader is online and on the same network.")
                }
            } catch (error) { console.log(error); }
        }
    };
    const establishSimulatedReaderConnection = async () => {
        let discoverResult;
        let enableSimulatedReader = { simulated: true };
        let selectedReader;

        if (client.terminal.getConnectionStatus() == 'not_connected') {
            console.log(`Establishing connetion with Stripe reader S/N: ${sn}...`)
            try {
                //find all readers.client
                discoverResult = await client.terminal.discoverReaders(enableSimulatedReader);
                //interate through list of reader and select one with mathcing SN
                selectedReader = discoverResult.discoveredReaders[0];
                setClient({ ...client, selectedReader: selectedReader })

                await client.terminal.connectReader(selectedReader);
                if (client.terminal.getConnectionStatus() == "connected") {
                    setClient({ ...client, paymentStatus: client.terminal.getPaymentStatus() })
                    console.log(`Connected to ${selectedReader.label}`);
                } else {
                    console.log("Not able to connect to reader. Make sure reader is online and on the same network.")
                }
            } catch (error) { console.log(error); }
        }
    }
    // initialize payment and capture --------------------------------------------------
    const collectCustomPayment = async () => {
        console.log("call: collectCustomPayment");
        let paymentIntent;
        let paymentMethod;
        let processedPayment;
        let capturedPaymentResponse;
        if (client.terminal.getConnectionStatus() == "not_connected") {
            await establishCardReaderConnection(sn);
            // await establishSimulatedReaderConnection();
        }
        client.terminal.setSimulatorConfiguration({
            testCardNumber: client.testCardNumber
        });
        try {
            paymentIntent = await stripeClient.createPaymentIntent(donationData);
            try {
                paymentMethod = await client.terminal.collectPaymentMethod(paymentIntent.client_secret);
                try {
                    processedPayment = await client.terminal.processPayment(paymentMethod.paymentIntent);
                    setClient({ ...client, paymentStatus: "processing" });
                    try {
                        capturedPaymentResponse = await stripeClient.capturePaymentIntent(donationData, processedPayment.paymentIntent.id);
                        console.log(capturedPaymentResponse)
                        setClient({ ...client, paymentCounter: client.paymentCounter + 1 })
                        setDonationData({
                            ...donationData,
                            anonymous: false,
                            fullName: "",
                            email: "",
                            line1: "",
                            line2: "",
                            city: "",
                            state: "",
                            country: "",
                            zip: "",
                        })
                        setActiveStep(0);
                        if (capturedPaymentResponse.status == "succeeded") {
                            setClient({
                                ...client, donationStatus: "succeeded",
                                paymentStatus: client.terminal.getPaymentStatus()
                            })
                        }
                        if (capturedPaymentResponse.status == "failed") {
                            setClient({
                                ...client, donationStatus: "failed",
                                paymentStatus: client.terminal.getPaymentStatus()
                            });
                        }
                        return (capturedPaymentResponse);
                    } catch (e) {
                        console.log("Failed to capture donation.")
                        return;
                    }
                } catch (e) {
                    console.log("Payment canceled.")
                    return;
                }
            } catch (e) {
                console.log("Failed to retireve Payment Method.");
                return;
            }
        } catch (e) {
            console.log("Failed to retrieve Payment Intent.");
            return;
        }
    };
    // fetch configuration and cause data --------------------------------------------------
    async function fetchData() {
        let cnf;
        let causeInf;
        try {
            cnf = await dbAPI.getConfig(sn);
            setConfig(cnf);
            if (cnf.operating_mode != 3) {
                causeInf = await benevityServices.getCauseInfo(cnf.recipient_id)
            }
            setCauseInfo(causeInf)
            if (cnf.operating_mode == 0) {
                setDonationData({
                    recipientId: cnf.recipient_id,
                    recipient_name: causeInf.data.attributes.name,
                    reader_serial_number: sn,
                    amount: cnf.amount,
                    anonymous: true,
                    fullName: "Annonymous",
                    email: "n/a",
                    line1: "n/a",
                    line2: "n/a",
                    city: "n/a",
                    state: "n/a",
                    country: "n/a",
                    zip: "n/a"
                });
            } else if (cnf.operating_mode == 3) {
                setDonationData({
                    recipientId: "",
                    recipient_name: "",
                    reader_serial_number: sn,
                    amount: cnf.amount,
                    anonymous: false,
                    fullName: "",
                    email: "",
                    line1: "",
                    line2: "",
                    city: "",
                    state: "",
                    country: "",
                    zip: ""

                });
            } else {
                setDonationData({
                    recipientId: cnf.recipient_id,
                    recipient_name: causeInf.data.attributes.name,
                    reader_serial_number: sn,
                    amount: cnf.amount,
                    anonymous: false,
                    fullName: "",
                    email: "",
                    line1: "",
                    line2: "",
                    city: "",
                    state: "",
                    country: "",
                    zip: ""

                });
            }

        } catch (e) { console.log(e) }
    }

    useEffect(() => {
        loadTerminal();
        fetchData();
    }, [])//run once on first render

    useEffect(() => {
        async function connect() {
            if ('terminal' in client) {
                await establishCardReaderConnection(sn);
                // await establishSimulatedReaderConnection();
            }
        }
        connect();
    }, [client.terminal])// run when client.terminal is defined

    function donateButtonHandler() {
        collectCustomPayment();
    }
    function cancelDonationButtonHandler() {
        client.terminal.cancelCollectPaymentMethod();
        client.terminal.clearReaderDisplay();
    }
    return (
        <>
            {config.operating_mode != 0 &&
                <div>
                    <Slide direction="down" in={!showTapToDonate} mountOnEnter unmountOnExit>
                        <SimpleTopHeader></SimpleTopHeader>
                    </Slide>
                    <Slide direction="up" in={showTapToDonate} mountOnEnter unmountOnExit>
                        <TapToDonate setShowTapToDonate={setShowTapToDonate}></TapToDonate>
                    </Slide>
                </div>
            }
                {(config.operating_mode == 0 && client.terminal != undefined && Object.keys(donationData).length != 0) &&
                    <ModeZero
                        client={client}
                        setClient={setClient}
                        donationData={donationData}
                        setDonationData={setDonationData}
                        causeInfo={causeInfo}
                        setCauseInfo={setCauseInfo}
                        collectCustomPayment={collectCustomPayment}
                        config={config}
                    ></ModeZero>}
            <CenterWrapper>
                {config.operating_mode != 0 &&
                    <CustomModes
                        operating_mode={config.operating_mode}
                        client={client} setClient={setClient}
                        donationData={donationData} setDonationData={setDonationData}
                        causeInfo={causeInfo} setCauseInfo={setCauseInfo}
                        donateButtonHandler={donateButtonHandler} cancelDonationButtonHandler={cancelDonationButtonHandler}
                        selectedAmountButton={selectedAmountButton} setSelectedAmountButton={setSelectedAmountButton}
                        activeStep={activeStep} setActiveStep={setActiveStep}
                        showTapToDonate={showTapToDonate} setShowTapToDonate={setShowTapToDonate}
                    ></CustomModes>}
            </CenterWrapper>
        </>
    )
}
