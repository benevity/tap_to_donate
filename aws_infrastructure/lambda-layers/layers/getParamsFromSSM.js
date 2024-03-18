const { SSMClient, GetParameterCommand, GetParametersByPathCommand } = require('@aws-sdk/client-ssm');
const REGION = 'us-east-1';
const ssmClient = new SSMClient({ region: 'us-east-1' });

// get all parameters by path
async function getParamsByPath(path) {
    const input = { // GetParametersByPathRequest
        Path: path, // required
        WithDecryption: true,
    };

    try {
        const command = new GetParametersByPathCommand(input);
        const response = await ssmClient.send(command);
        return response.Parameters;
    } catch (error) {
        console.error(`Error retrieving secret: ${error}`);
        throw error;
    }
}
//get parameter value 
async function getParamValue(secretName){
    const params = {
        Name: secretName,
        WithDecryption: true
    };

    try {
        const command = new GetParameterCommand(params);
        const response = await ssmClient.send(command);
        return response.Parameter.Value;
    } catch (error) {
        console.error(`Error retrieving secret: ${error}`);
        throw error;
    }
}
//given array of parameters return value
function findParamValue(params, name){
    const matchedParam= params.find(element => element.Name==name);
    return matchedParam.Value;
}

module.exports={
    getParamValue:getParamValue,
    getParamsByPath:getParamsByPath,
    findParamValue:findParamValue,
}