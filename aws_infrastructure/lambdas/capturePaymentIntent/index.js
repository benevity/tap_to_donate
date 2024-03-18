const {makeBenevityDonation} = require("makeBenevityDonation");
const {sendToQueue} = require("sendToQueue");
const {postDonationRecordToDb} = require("postDonationRecordToDb");
const {getParamValue} = require("getParamsFromSSM");
//Make Benevity donation and captrues Stripe donation
exports.handler = async (event) => {
    let response;
    const headers = {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    };

    let body = await JSON.parse(event.body);
    //1. Initialize stripe
    const stripe = require("stripe")(await getParamValue("/taptodonate/stripe/test-key"));

    //2. call benevityAPI to make custom donation
    let benevityResponse;
    try {
        benevityResponse = await makeBenevityDonation(body.donationData);
        console.log(benevityResponse)
        console.log("DonationID: " + benevityResponse.id);

        //2.1 send to Queue for receipt.
        if (body.donationData.anonymous == 0) {
            let queueRes = await sendToQueue(benevityResponse.id)
        }
    } catch (e) {
        response = {
            statusCode: 400,
            headers,
            body: e.message
        };
        console.log(response);
        return response;
    }

    //3. capture payment intent if benevity donation is successful
    let capturedPaymentIntent;
    try {
        // capturedPaymentIntent = await stripe.paymentIntents.capture(body.stripeData.paymentIntentId);
        if (benevityResponse.attributes.state.processingStatus == "ACCEPTED") {
            capturedPaymentIntent = await stripe.paymentIntents.capture(body.stripeData.paymentIntentId);
        }
    } catch (e) {
        response = {
            statusCode: 400,
            headers,
            body: e.message
        };
        console.log(response);
        return response;
    }

    //4. post record to DB table donation_records
    let dbResponse;
    try {
        dbResponse = await postDonationRecordToDb(benevityResponse.id,
            capturedPaymentIntent.id,
            body.donationData.reader_serial_number,
            body.donationData.recipientId,
            body.donationData.recipient_name,
            capturedPaymentIntent.amount,
            capturedPaymentIntent.currency,
            body.donationData.anonymous)
        console.log(dbResponse);
    } catch (e) {
        response = {
            statusCode: 400,
            headers,
            body: e.message
        };
        console.log(response);
        return response;
    }

    response = {
        statusCode: 200,
        headers,
        body: JSON.stringify(capturedPaymentIntent)
    };
    console.log(response);
    return response;
};
