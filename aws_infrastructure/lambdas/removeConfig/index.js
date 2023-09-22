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
    let sqlQuery1=  `UPDATE configs
                    SET deactivated_dts=current_timestamp()
                    WHERE config_id=${body.config_id} AND client_id='${body.client_id}'`;
    let sqlQuery2=`UPDATE reader_config_assignment
                    SET deactivated_dts=current_timestamp()
                    WHERE config_id=${body.config_id} AND deactivated_dts IS NULL`
    try {
        const data = await new Promise((resolve, reject) => {
            connection.connect(function (err) {
                if (err) {
                    reject(err);
                }
                
                connection.query(sqlQuery1, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                });
                connection.query(sqlQuery2, function (err, result) {
                    if(err){
                        reject(err)
                    }
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