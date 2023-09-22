import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import './LoadingPage.css';
import CircularProgress from '@mui/material/CircularProgress';
<meta name='viewpoint' content='width=device-width, initial-scale=1.0'></meta>



function LoadingPage() {
    return (

        <Box className='bg'
            style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >

            <div className='popup2'>

                <div>
                    <h2 className='PleaseWait'>Please Wait</h2>
                    <div class="col-3">
                        <div class="snippet" data-title=".dot-spin">
                            <div class="stage">
                                <div class="dot-spin"></div>
                            </div>
                        </div>
                    </div>
                    {/* <h3 className='Processing'>We are processing Your donation...</h3> */}

                </div>

            </div>


        </Box>
    )
}
export default LoadingPage;