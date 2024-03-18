const mysql = require('mysql');
const {getParamsByPath, findParamValue} = require("getParamsFromSSM");
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


    const headers = {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    };
    let body=JSON.parse(event.body);
    let response;
    let sqlQuery=  `select readers.reader_serial_number, readers.label, readers.location, configs.title, configs.amount,configs.operating_mode, reader_config_assignment.assigned_dts
                    from reader_config_assignment 
                    left join readers on reader_config_assignment.reader_serial_number = readers.reader_serial_number 
                    left join configs on reader_config_assignment.config_id=configs.config_id
                    where reader_config_assignment.deactivated_dts is null 
                    and configs.client_id=${body.client_id}`
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

        if(data==null){
            response = {
                statusCode:404,
                headers,
                body:"Configs Not Found"
            };
            console.log(response);

            return response;
        }

        response =  {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        }
        console.log(JSON.stringify(response));

        return response;
    } catch (err) {
        response = {
            statusCode: 400,
            headers,
            body: err.message
        };
        console.log(JSON.stringify(response));
        return response;
    }
};