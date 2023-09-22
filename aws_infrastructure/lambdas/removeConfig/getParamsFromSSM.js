const AWS = require("aws-sdk");
// get all parameters by path
async function getParamsByPath(paramPath){
const ssm = new AWS.SSM();
    try{
        const data= await ssm.getParametersByPath({ 
            Path:paramPath,
        }).promise();
        return data.Parameters;
    }catch(e){console.log(e)}
    
}
//get parameter value 
async function getParamValue(paramName){
const ssm = new AWS.SSM();
    try{
        const data= await ssm.getParameter({ 
            Name:paramName,
        }).promise();
        return data.Parameter.Value;
    }catch(e){console.log(e)}
    
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