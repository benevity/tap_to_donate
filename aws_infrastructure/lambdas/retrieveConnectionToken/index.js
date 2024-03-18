const {getParamValue} = require("getParamsFromSSM");

//Retrieve Stripe connection token
exports.handler = async (event) => {
    const STRIPE_KEY = await getParamValue("/taptodonate/stripe/test-key");
    const stripe = require("stripe")(STRIPE_KEY);

    let connectionToken = await stripe.terminal.connectionTokens.create();
    const response = {
        statusCode: 200,
        headers : {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(connectionToken),
    };
    console.log(response);
    return response;
};
