import { useEffect, useState } from 'react';
import { searchForCauses } from '../../../services/dbAPI';
import CauseCard2 from '../../cause-card2/CauseCard2';
import Stack from "@mui/material/Stack"

export default function SearchResultsCard({setIsLoading,causes, setCauses,setDonationCause,queryString}){
    const [noCauses, setNoCauses] = useState(false);
    useEffect(() => {
        let data;
        let isMounted =true;
        async function getCauses() {
            setIsLoading(true);
            console.log('fetching data')
            data = await searchForCauses(queryString);
            if(data.data.length ==0){
                setNoCauses(true);
            }else(setNoCauses(false));

            if(isMounted){
                setCauses(data.data);
                console.log(data.data)
            setIsLoading(false);
            }
        }

        if(queryString!=""){
            // setIsLoading(true);
            getCauses();
            return()=>{isMounted=false};
        }
    }, [queryString]) //runs on query string change 

    return(
        <>
        <Stack spacing ={2} sx={{top:"10%"}}>
        {/* <h3>Search Results: </h3> */}
           {causes.map((cause)=><CauseCard2 key={cause.id} causeInfo={cause} setDonationCause={setDonationCause}></CauseCard2>)}
           {(noCauses) && <h3>No Causes were found</h3>}
        </Stack>
        </>
    )
}