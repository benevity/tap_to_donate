const axios = require("axios");
const {getSecretValue} = require("./getSecretValue");
const {getParamsByPath, findParamValue} = require("./getParamsFromSSM");
   
//Retrieve access token to call API at benevity-staging
async function getAccessToken(){
    //get array of parameters for rds
    const params = await getParamsByPath('/taptodonate/benevity/');
    
    // const oAuthURL ='https://api.benevity-staging.org/oauth2/token?grant_type=client_credentials';
    const oAuthURL = await findParamValue(params, '/taptodonate/benevity/o-auth-url');
    // const client_secret = await getSecretValue("CLIENT_SECRET");
    const client_secret = await findParamValue(params, '/taptodonate/benevity/client_secret');
    // const client_id = await getSecretValue("CLIENT_ID");
    const client_id= await findParamValue(params, '/taptodonate/benevity/client_id');
    const auth = client_id + ':' + client_secret;
    const auth_buff = new Buffer.from(auth);
    const auth_encoded = auth_buff.toString('base64');

    let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + auth_encoded
    };
    let options = {
            method: 'post',
            url: oAuthURL,
            headers: headers
    };

    let response = await axios(options).then((response)=>response).catch((error) => {
            return {
                    message: 'Unable to obtain access token.',
                    error: error
            };
    });  
    return response.data.access_token;
}
module.exports = {
    getAccessToken:getAccessToken   
};