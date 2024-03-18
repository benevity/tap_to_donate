const {getDonationInfo} = require("getDonationInfo");
const {sendReceipt} = require("sendReceipt");
const {sendToQueue} = require("sendToQueue");
var AWS = require('aws-sdk');
var sqs= new AWS.SQS();

exports.handler = async (event) => {
    let donationData = await getDonationInfo(event.Records[0].body) 
    //check if attributes.funds.receiptId exists, if(true) send receipt else send donationId back to que
    if(donationData.attributes.funds.hasOwnProperty("receiptId")){
        await sendReceipt(donationData.attributes.donor.email,donationData.attributes.funds.receiptId);
    }else{
        await sendToQueue(donationData.id)
    }
};
