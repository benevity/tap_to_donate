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
    let client_id = body.client_id;

    let response;
    let sqlQuery=  `INSERT INTO configs (name, title, summary,operating_mode, recipient_id,amount,start_dts,end_dts,created_dts,deactivated_dts,client_id) VALUES ('${body.name}', '${body.title}', '${body.summary}', ${body.operating_mode}, '${body.recipient_id}', ${body.amount}, ${body.start_dts}, ${body.end_dts}, current_timestamp(), null, '${client_id}')`;
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