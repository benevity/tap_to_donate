import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import './popUpWindow.css';
<meta name='viewpoint' content='width=device-width, initial-scale=1.0'></meta>

function SuccessfulCustomDonation({donationData, client, setClient,setShowTapToDonate}) {
    const popUpDisplayTimer = 10;//seconds
    const [countDown, setCountDown]=useState(popUpDisplayTimer);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCountDown(countDown -1);
        },1000);
        return ()=>{clearInterval(interval)
                    };
    },[countDown])

    //hide popup after 10 seconds
    let popupTimer;
    useEffect(() => {
        if(client.donationStatus!=false){
            popupTimer = setTimeout(() => setClient({...client, donationStatus:false}),popUpDisplayTimer*1000);
        }
        return() => {
            clearTimeout(popupTimer);
            setShowTapToDonate(true);
        }
    }, []);

    //hide popup when OK pressed
    function OkButtonHandler() {
        setClient({...client, donationStatus:false})
        clearTimeout(popupTimer);
        setShowTapToDonate(true);
    }
    return (
        <Box className="bg"
            style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <div className='container'>
                <div className="popup">
                    <img className="popupimg" src="success-icon.png"></img>
                    <h2 className="popup">Thank You for Your Donation!</h2>
                    {!(donationData.anonymous) && <p className='p1'>Your details has been successfully submitted. Thank You!</p>
                    }
                    <button onClick={OkButtonHandler} className="green_button" type='button'><b>OK</b></button>
                    <p>This window will close in {countDown} seconds.</p>
                </div>
            </div>
        </Box>
    )
}
export default SuccessfulCustomDonation;