import { APIGateWayURL, CLIENT_ID} from "./variables";

export async function getConfigsTable() {//get confgis data for a client
  let url = '/getConfigsTable';
  let body = { client_id: CLIENT_ID}
  return POST(url, body);
}
export async function getReadersTable() {//get all readers data a client
  let url = '/getReadersTable';
  let body = { client_id: CLIENT_ID}
  return POST(url, body);
}
export async function getDonationRecords() {//get all clients donation records
  let url = '/getDonationRecords';
  let body = { client_id: CLIENT_ID}
  return POST(url, body);
}
export async function getActiveConfigsTable() {//get assigned configs data 
  let url = '/getActiveConfigsTable';
  let body = { client_id: CLIENT_ID}
  return POST(url, body);
}
export async function postNewConfig(config_info){// create new config
  let url = '/postNewConfig';
  let body = {...config_info, client_id:CLIENT_ID}
  return POST(url, body);
}
export async function removeConfig(config_id){//deactivate config
  let url = '/removeConfig';
  let body = {client_id:CLIENT_ID,config_id:config_id}
  return POST(url, body);
}
export async function assignConfigToReader(config_id,reader_serial_number){//assign new config to reader
  let url='/assignConfigToReader'
  let body={client_id:CLIENT_ID, config_id:config_id, reader_serial_number:reader_serial_number}
  return POST(url,body);
}
export async function searchForCauses(queryString){//search for causes
    let url='/searchForCauses';
    let body={queryString:queryString}
    return POST(url,body);
}

export async function getConfig(serial_number){// fetch config file for reader
    let url='/getConfig';
    let body={serialNumber:serial_number}
    return POST(url,body);
}

async function POST(url, body) {
  let response;
  let data;
  try {
    response = await fetch(APIGateWayURL+ url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
  }
}
