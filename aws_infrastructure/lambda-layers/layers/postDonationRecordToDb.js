const mysql = require('mysql');
const {getParamsByPath, findParamValue} = require("./getParamsFromSSM");

async function postDonationRecordToDb(benevity_donation_id, 
                                    stripe_payment_id, 
                                    reader_serial_number,
                                    recipient_id,
                                    recipient_name,
                                    amount, 
                                    currency, 
                                    anonymous){
    
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
    let response;
    let sqlQuery=  `INSERT INTO donation_records (benevity_donation_id, stripe_payment_id, reader_serial_number,recipient_id, recipient_name, amount,currency, anonymous, transaction_dts) 
                                        VALUES ('${benevity_donation_id}', '${stripe_payment_id}','${reader_serial_number}','${recipient_id}','${recipient_name}',${amount},'${currency}',${anonymous},current_timestamp())`;
    console.log(sqlQuery);
    try {
        const data = await new Promise((resolve, reject) => {
            connection.connect(function (err) {
                if (err) {
                    reject(err);
                }
                
                connection.query(sqlQuery,  function (err, result) {
                    if (err) {
                        reject(err);
                        console.log(err);
                    }
                    resolve(result);
                    connection.destroy();
                });
            });
        });
        
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
module.exports={
    postDonationRecordToDb:postDonationRecordToDb,
};