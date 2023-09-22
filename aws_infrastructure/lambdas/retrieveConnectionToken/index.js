const AWS = require("aws-sdk");
const {getSecretValue} = require('./getSecretValue');
const {getParamValue} = require("./getParamsFromSSM");

//Retrieve Stripe connection token
exports.handler = async (event) => { 
 const STRIPE_KEY = await getParamValue("/taptodonate/stripe/test-key");
 const stripe = require("stripe")(STRIPE_KEY);

 let connectionToken = await stripe.terminal.connectionTokens.create();
  const response = {
      statusCode: 200,
      body: JSON.stringify(connectionToken),
  };
  return response;
};
