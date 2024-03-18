const AWS = require('@aws-sdk/client-ssm');
const region = "us-east-1";
const ssm = new AWS.SSM ({region: region});

//Retrieve specified secret from SecretManger
exports.getSecretValue = async () =>{
    ssmClient.getParametersByPath({
        Path: `/tap-to-donate/`,
        Recursive: true,
        WithDecryption: true
    }, (err, data) => {
        if (data?.Parameters) {
            console.log(data.Parameters);
            const data = JSON.parse(parameter.Parameter.Value);
            return data;
        }
    });
}