import { loadStripeTerminal } from "@stripe/terminal-js/pure";
import { APIGateWayURL} from "./variables";

export async function loadAndInitializeStripeTerminal(_unexpectedDisconnect) {
    const StripeTerminal = await loadStripeTerminal();
    const terminal = StripeTerminal.create({
        onFetchConnectionToken: await createConnectionToken,
        onUnexpectedReaderDisconnect: await _unexpectedDisconnect,
    });
    return terminal;
}
async function createConnectionToken() {
    let response = await fetch(APIGateWayURL+ '/retrieveConnectionToken', {
        method: "GET"
    });
    let data = await response.json();
    return data.secret;
};

//----------------------------------------------------------------------------------------------------
export async function createPaymentIntent(donationData) {
    const resourseEndpoint = '/createPaymentIntent'
    let body = { amount: donationData.amount };
    return doPost(resourseEndpoint, body)
}
export async function capturePaymentIntent(donationData, paymentIntentId) {
    const resourseEndpoint = '/capturePaymentIntent';
    let body = {
        donationData: donationData,
        stripeData: {
            paymentIntentId: paymentIntentId,
            amount: donationData.amount,
        }
    }
    return doPost(resourseEndpoint, body)
};

async function doPost(resourseEndpoint, body) {
    let response;
    let data;
    try {
        response = await fetch(APIGateWayURL+ resourseEndpoint, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        data = await response.json();
        return data;
    } catch (e) {
        console.log(e)
    }

};
//----------------------------------------------------------------------------------------------------

