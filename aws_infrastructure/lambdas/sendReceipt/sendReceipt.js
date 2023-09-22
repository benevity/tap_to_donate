const axios = require("axios");
const {getAccessToken} = require("./getAccessToken");

const receiptURL= 'https://api.benevity-staging.org/receipts/';

//Call benevity API to make donation
async function sendReceipt(email,receiptId){
    let receiptTemplate={
        "data": {
            "type": "emails",
            "attributes": {
                "to": email
            }
        }
    }
    
    let url = receiptURL+receiptId+"/email";
    let config = {
        headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
            'Content-Type':"application/vnd.api+json"
        },
    };
    try{
        let promise = await axios.post(url, receiptTemplate, config);
        return promise.data.data;
    }catch(error){
        return {
            message: 'Unable to send Receipt.',
            error: error
        };
    }
    
}
module.exports ={
    sendReceipt:sendReceipt,
};
