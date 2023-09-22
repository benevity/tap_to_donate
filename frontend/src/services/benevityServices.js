import { APIGateWayURL } from "./variables";

export async function getCauseInfo(causeId){
  console.log("Retrieving Cause Info...")
  let response;
  let causeInfo;
  try{
    response= await fetch(APIGateWayURL+ '/getCauseInfo', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        causeId: causeId,
      }),
    })
  }catch(error){
    console.log(error);
  }

  if(response.status==200){
    try{
      causeInfo= await response.json();
      return causeInfo;
    } catch (error){
      console.log (error)
    }
  }
  return null;
};
