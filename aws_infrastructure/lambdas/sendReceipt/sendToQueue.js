const AWS = require('aws-sdk')
const {getParamValue} = require("./getParamsFromSSM");


// For Standard Queue
async function sendToQueue(donationId){
    const sqs = new AWS.SQS();
    var params = {
      // MessageGroupId:"testGroupId1",
      // MessageDeduplicationId:"messagededuplicationId1",
      MessageAttributes: {
         "donationId": {
          DataType: "String",
          StringValue: donationId
         },
      },
      MessageBody: donationId,
      QueueUrl:getParamValue("/taptodonate/sqs/endpoint-url") 
    };
    
    let queueRes = await sqs.sendMessage(params).promise();
    const response = {
        statusCode: 200,
        body: queueRes,
    };
    
    return response;
};


module.exports ={
    sendToQueue:sendToQueue,
};
