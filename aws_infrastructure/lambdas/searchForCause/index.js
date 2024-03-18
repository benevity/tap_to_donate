const axios = require("axios");
const {getAccessToken} = require("getAccessToken");
const donationsURL= 'https://api.benevity-staging.org/search/causes';

//Retrieve cause information for specified causeId
exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    let url = donationsURL+body.queryString;
    const headers = {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    };
    let response;

    console.log(url);

    let config = {
        headers: {
            Authorization: `Bearer ${await getAccessToken()}`
        }
    };
    let searchResults;

    try {
        searchResults = await axios.get(url,config);
    } catch(error){
        response = {
            statusCode:404,
            headers,
            body:error
        };

        console.log(response);
        return response;

    }
    response = {
        statusCode: 200,
        headers,
        body:JSON.stringify(searchResults.data)
    };

    console.log(response);
    return response;
};