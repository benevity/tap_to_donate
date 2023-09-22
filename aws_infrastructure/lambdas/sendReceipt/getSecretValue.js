const AWS = require("aws-sdk");
const region = "us-east-1";
const sm = new AWS.SecretsManager ({region});
const SecretId= 'Stripe-test-key';

//Retrieve specified secret from SecretManger
function getSecretValue(secret){
    return new Promise((resolve, reject) =>{
        sm.getSecretValue({SecretId}, (err, result) =>{
            if (err){ 
                reject(err);
            }else{
                const secretsJSON=JSON.parse(result.SecretString);
                resolve(secretsJSON[secret]);
            }
        });
    });  
}    
module.exports ={
    getSecretValue:getSecretValue
    }; 