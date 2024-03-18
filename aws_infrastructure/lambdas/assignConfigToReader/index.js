const mysql = require('mysql');
const {getParamsByPath, findParamValue} = require("getParamsFromSSM");

exports.handler = async (event) => {

    let response;
    //get array of parameters for rds
    const params = await getParamsByPath('/taptodonate/rds/');
    //connect to db with parameters from ssm. 
    const connection = mysql.createConnection({
        host: findParamValue(params, '/taptodonate/rds/endpoint-url'),
        user: findParamValue(params, "/taptodonate/rds/user"),
        password: findParamValue(params, "/taptodonate/rds/password"),
        database: findParamValue(params, "/taptodonate/rds/db-name"),
        port: findParamValue(params, "/taptodonate/rds/port"),
    });

    const headers = {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    };
    let body = JSON.parse(event.body);
    let sqlQuery1 = `UPDATE reader_config_assignment
                     SET deactivated_dts = current_timestamp()
                     WHERE reader_serial_number = '${body.reader_serial_number}'
                       AND deactivated_dts IS NULL;`
    let sqlQuery2 = `INSERT INTO reader_config_assignment(assigned_dts, deactivated_dts, config_id, reader_serial_number)
                     VALUES (current_timestamp(), null, ${body.config_id}, '${body.reader_serial_number}');`
    try {
        const data = await new Promise((resolve, reject) => {
            connection.connect(function (err) {
                if (err) {
                    reject(err);
                }

                connection.query(sqlQuery1, function (err, result) {
                    if (err) {
                        console.log("Error:" + err);
                        reject(err);
                    }
                    resolve(result);
                });
                connection.query(sqlQuery2, function (err, result) {
                    if (err) {
                        console.log("Error:" + err);
                        reject(err);
                    }
                    resolve(result);
                    connection.destroy();
                });
            });
        });

        response = {
            statusCode: 200,
            headers
        };
        return response;
    } catch (err) {
        response = {
            statusCode: 400,
            headers,
            body: err.message
        };
        console.log(response);
        return response;
    }


};