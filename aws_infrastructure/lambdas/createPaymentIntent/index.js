const {getParamValue} = require("getParamsFromSSM");

//Create Stripe PaymentIntent object for specified donation amount
exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    
    const stripe = require("stripe")(await getParamValue("/taptodonate/stripe/test-key"));
    
    let paymentIntentObject;
    try{
        paymentIntentObject= await stripe.paymentIntents.create({
                    amount:body.amount,
                    currency: 'cad',
                    payment_method_types: [
                            'card_present',
                            'interac_present',
                    ],
                    capture_method: 'manual',
            });
    }catch (error){
        return error;
    }
    
     const response = {
        statusCode: 200,
         headers : {
             "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
             "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
         },
        body: JSON.stringify(paymentIntentObject),
    };
    return response;
};
