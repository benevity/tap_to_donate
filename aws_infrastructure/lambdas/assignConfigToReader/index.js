const mysql = require('mysql');
const {getParamsByPath, findParamValue} = require("./getParamsFromSSM");

exports.handler = async (event) =>{

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
    let response;
    let sqlQuery1=  `UPDATE reader_config_assignment
                    SET deactivated_dts = current_timestamp()
                    WHERE reader_serial_number='${body.reader_serial_number}'
                    AND deactivated_dts IS NULL;`
    let sqlQuery2= `INSERT INTO reader_config_assignment(assigned_dts, deactivated_dts, config_id, reader_serial_number)
                    VALUES  (current_timestamp(),null,${body.config_id},'${body.reader_serial_number}');`
    try {
        const data = await new Promise((resolve, reject) => {
            connection.connect(function (err) {
                if (err) {
                    reject(err);
                }
                
                connection.query(sqlQuery1,  function (err, result) {
                    if (err) {
                        console.log("Error:" + err);
                        reject(err);
                    }
                });
                connection.query(sqlQuery2, function(err,resutl){
                    if(err){
                        console.log("Error:" +err);
                        reject(err);
                    }
                    connection.destroy();
                });
            });
        });
        
    return {
        statusCode: 200,
    };
    } catch (err) {
        return {
            statusCode: 400,
            body: err.message
        };
    }
    
    
    
};