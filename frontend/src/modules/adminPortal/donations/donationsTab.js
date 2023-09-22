import { useEffect, useState } from 'react';
import DonationsTable from "./donationsTable"
import {Box, Button} from "@mui/material"
import { ButtonsWrapper } from "../../../styles/wrapper-components"
import { getDonationRecords } from "../../../services/dbAPI";

export default function DonationsTab() {

  const [dbData, setDbData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function refreshDonationsTable(){
    let data;
    let isMounted = true;
    async function getRecords(){
      setIsLoading(true);
      data = await getDonationRecords();
      if(isMounted){
        setDbData(data);
        setIsLoading(false);
      }
    }

    getRecords();
    return()=>{isMounted=false}
  }

  useEffect(()=>{
    refreshDonationsTable();
  },[])
  
  return (
    <>
      <ButtonsWrapper>
        <div></div>
        <div>
          <Button variant="contained" color="primary" onClick={() => refreshDonationsTable()}>Refresh</Button>
        </div>
      </ButtonsWrapper>
      <Box sx={{ height: 900, width: '100%' }}>
        <DonationsTable dbData={dbData} isLoading={isLoading}></DonationsTable>
      </Box>
    </>

  )
}