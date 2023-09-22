const axios = require("axios");
const {getAccessToken} = require("./getAccessToken");
const donationsURL= 'https://api.benevity-staging.org/causes/';

//Retrieve cause information for specified causeId
exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    let url = donationsURL+body.causeId;
    let config = {
            headers: {
                    Authorization: `Bearer ${await getAccessToken()}`
            }
    };
    let causeInfo;
   try{
        causeInfo = await axios.get(url,config);
   }catch(error){
       return({
           statusCode:404,
           body:error
       });
       
   }
    const response = {
        statusCode: 200,
        body:JSON.stringify(causeInfo.data)
    };
    
    return response;
};