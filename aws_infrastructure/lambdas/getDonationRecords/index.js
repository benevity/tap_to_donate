const mysql = require('mysql');
const {getParamsByPath, findParamValue} = require("./getParamsFromSSM");

exports.handler = async (event) =>{
//exports.handler = async () =>{
    //get array of parameters for rds
    const params = await getParamsByPath('/taptodonate/rds/');
    //connect to db with parameters from ssm. 
    const connection = mysql.createConnection({
        host: findParamValue(params, '/taptodonate/rds/endpoint-url'),
        user: findParamValue(params,"/taptodonate/rds/user"),
        password: findParamValue(params,"/taptodonate/rds/password"),
        database: findParamValue(params,"/taptodonate/rds/db-name"),
        port: findParamValue(params,"/taptodonate/rds/port"),
    });
    let body=JSON.parse(event.body);
    let client_id = body.client_id;
    let response;
    //let client_id = 1;
    let sqlQuery=`SELECT benevity_donation_id, stripe_payment_id, donation_records.reader_serial_number, donation_records.amount, currency, donation_records.anonymous,recipient_id, recipient_name,transaction_dts
                    FROM donation_records
                    LEFT JOIN readers ON donation_records.reader_serial_number = readers.reader_serial_number
                    WHERE client_id="${client_id}"`
    try {
        const data = await new Promise((resolve, reject) => {
            connection.connect(function (err) {
                if (err) {
                    reject(err);
                }
                
                connection.query(sqlQuery,  function (err, result) {
                    if (err) {
                        console.log("Error:" + err);
                        reject(err);
                    }
                    resolve(result);
                    connection.destroy();
                });
            });
        });
        
        console.log('data')
        console.log(data)
        if(data==null){
            return{
                statusCode:404,
                body:"Configs Not Found"
            }
        }
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
    } catch (err) {
        return {
            statusCode: 400,
            body: err.message
        };
    }
    
    
    
};