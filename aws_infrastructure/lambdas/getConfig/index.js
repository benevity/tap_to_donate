const mysql = require('mysql');
const {getParamsByPath, findParamValue} = require("getParamsFromSSM");

exports.handler = async (event) =>{

    let body=JSON.parse(event.body);
    let readerId = body.serialNumber;
    let response;
    const headers = {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    };

    let sqlQuery=`SELECT configs.config_id, reader_serial_number, recipient_id,amount,operating_mode \
    FROM reader_config_assignment \
    LEFT JOIN configs ON reader_config_assignment.config_id = configs.config_id \
    WHERE reader_serial_number = '${readerId}' AND reader_config_assignment.deactivated_dts IS NULL`;

    //Create connection
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
                    resolve(result[0]);
                    connection.destroy();
                });
            });
        });

        console.log('data');
        console.log(data);
        if(data==null){
            return{
                statusCode:404,
                headers,
                body:"Reader Not Found"
            }
        }
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    } catch (err) {

        console.log(err.message);
        return {
            statusCode: 400,
            headers,
            body: err.message
        };
    }
};