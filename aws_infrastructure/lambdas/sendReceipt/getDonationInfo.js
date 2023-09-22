const axios = require("axios");
const {getAccessToken} = require("./getAccessToken");
const donationsURL= 'https://api.benevity-staging.org/donations/';

//Call benevity API to make donation
async function getDonationInfo(donationId){
        let url = donationsURL+donationId;
        let config = {
                headers: {
                        Authorization: `Bearer ${await getAccessToken()}`
                }
        };
        try{

            let promise = await axios.get(url, config);
            return promise.data.data;
        }catch(error){
            return {
                    message: 'Unable to get donation info for specified id.',
                    error: error
            };
        }

}
module.exports ={
    getDonationInfo:getDonationInfo,
};
