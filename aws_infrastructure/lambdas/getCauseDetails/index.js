const axios = require("axios");
const {getAccessToken} = require("getAccessToken");
const donationsURL= 'https://api.benevity-staging.org/causes/';

//Retrieve cause information for specified causeId
exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    let url = donationsURL+body.causeId;

    console.log(JSON.stringify(donationsURL+body.causeId));

    let config = {
        headers: {
            Authorization: `Bearer ${await getAccessToken()}`
        }
    };
    let causeInfo;
    const headers = {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    };
    try{
        causeInfo = await axios.get(url,config);
    }catch(err){
        console.log(err.message);

        return({
            statusCode:404,
            headers,
            body:err
        });

    }
    const response = {
        statusCode: 200,
        headers,
        body:JSON.stringify(causeInfo.data)
    };

    console.log(response);

    return response;
};