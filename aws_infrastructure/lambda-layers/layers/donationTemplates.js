//Return Benevity Donation templates for annonymous or custom donations
function createAnonymousDonationTemplate(donationData){
    let anonymousDonationTemplate = {
        "data": {
            "type": "donations",
            "attributes": {
                "destination": {
                    "foundationId":donationData.foundationId, 
                    "recipientId":donationData.recipientId,
                },
                "donor": {
                    "fullName": "Anonymous Donation",
                    "email": "test@benevity.com",
                    "receipted": false,
                    "address": {
                        "city": "N/A",
                        "country": "N/A",
                        "line1": "N/A",
                        "line2": "N/A",
                        "state": "N/A",
                        "zip": "N/A"
                    }
                },
                "funds": {
                    "amount": donationData.amount,
                    "currencyCode": "CAD",
                    "paymentType": "DONATION_REPORT",
                    "source": "USER"
                }
            }
        }
    }
    return anonymousDonationTemplate;
}
function createCustomDonationTemplate(donationData){
    let customDonationTemplate = {
        "data": {
            "type": "donations",
            "attributes": {
                "destination": {
                    "foundationId": donationData.foundationId,
                    "recipientId": donationData.recipientId, 
                },
                "donor": {
                    "fullName": donationData.fullName,
                    "email": donationData.email,
                    "receipted": true,
                    "address": {
                        "city": donationData.city,
                        "country":donationData.country, 
                        "line1": donationData.line1,
                        "line2": donationData.line2,
                        "state": donationData.state,
                        "zip": donationData.zip
                    }
                },
                "funds": {
                    "amount": donationData.amount,
                    "currencyCode": "CAD",
                    "paymentType": "DONATION_REPORT",
                    "source": "USER"
                }
            }
        }
    }
    return customDonationTemplate;
}
// function createCustomDonationTemplate(donationData){
//     let customDonationTemplate = {
//         "data": {
//             "type": "donations",
//             "attributes": {
//                 "destination": {
//                     "foundationId":donationData.foundationId, 
//                     "recipientId": donationData.recipientId, 
//                 },
//                 "donor": {
//                     "fullName": "Test user",
//                     "email": "4.chaykovskyy@gmail.com",
//                     "receipted": true,
//                     "address": {
//                         "city": "Calgary",
//                         "country":"Canada", 
//                         "line1": "123 Ave SE",
//                         "line2": "",
//                         "state": "AB",
//                         "zip":"t1t1t1" 
//                     }
//                 },
//                 "funds": {
//                     "amount": donationData.amount,
//                     "currencyCode": "CAD",
//                     "paymentType": "DONATION_REPORT",
//                     "source": "USER"
//                 }
//             }
//         }
//     }
//     return customDonationTemplate;
// }

module.exports={
    createCustomDonationTemplate:createCustomDonationTemplate,
    createAnonymousDonationTemplate:createAnonymousDonationTemplate,
};