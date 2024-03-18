const axios = require("axios");
const {getAccessToken} = require("./getAccessToken");
const {createAnonymousDonationTemplate, createCustomDonationTemplate} = require("./donationTemplates");
const donationsURL= 'https://api.benevity-staging.org/donations';

//Call benevity API to make donation
async function makeBenevityDonation(donationData){
        let donationTemplate;
        if(donationData.anonymous == true){
            donationTemplate = createAnonymousDonationTemplate(donationData);
        }else{
           donationTemplate = createCustomDonationTemplate(donationData);
        }
        
        let url = donationsURL;
        let config = {
                headers: {
                        Authorization: `Bearer ${await getAccessToken()}`
                }
        };
        try{

            let promise = await axios.post(url, donationTemplate, config);
            return promise.data.data;
        }catch(error){
            return {
                    message: 'Unable to make donation.',
                    error: error
            };
        }

}
module.exports ={
    makeBenevityDonation:makeBenevityDonation,
};
