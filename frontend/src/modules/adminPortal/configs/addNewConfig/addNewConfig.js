import {React,useState }from "react";
import HorizontalStepper from "./stepper/horizontalStepper";
import ConfigInfo from "./stepper/configInfo/configInfo";
import OperatingMode from "./stepper/operatingMode/operatingMode";
import DonationDetails from "./stepper/donationDetails/donationDetails";
import SearchForCause from "./stepper/searchForCause/searchForCause";
import { postNewConfig } from "../../../../services/dbAPI";

export default function AddNewConfig({setIsLoading, render, setRender, showAddNewConfig}){
    const [config, setConfig] =useState({
        client_id:'1',
        name:"",
        title:"",
        summary:"",
        recipient_id:"",
        amount:1,
        operating_mode:null,
        start_dts:null,
        end_dts:null,
    })

    const stepTitles =['Operating Mode','Search For Cause','Config Info','Donation Details']
    const steps =[
        <OperatingMode config={config} setConfig={setConfig}></OperatingMode>,
        <SearchForCause config={config} setConfig={setConfig}></SearchForCause>,
        <ConfigInfo config={config} setConfig={setConfig}></ConfigInfo>,
        <DonationDetails config={config} setConfig={setConfig}></DonationDetails>,
    ]
    async function handleCreate(){
        showAddNewConfig(false);
        setIsLoading(true);

        await postNewConfig({...config, amount:config.amount*100})
        setRender(render+1);
    }
    return(
        <HorizontalStepper stepTitles={stepTitles} steps={steps} handleCreate={handleCreate}></HorizontalStepper> 
    )
} 