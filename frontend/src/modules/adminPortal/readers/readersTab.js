import {useEffect, useState} from 'react';
import { ButtonsWrapper } from "../../../styles/wrapper-components"
import Button from "@mui/material/Button"
import Box from '@mui/material/Box';
import ReadersTable from './readersTable';

export default function ReadersTab() {
    return (
        <>
            <ButtonsWrapper>
                <div></div>
                <div>
                    <Button variant="contained" color="primary" disabled>Request Reader</Button>
                </div>
            </ButtonsWrapper>
          <Box sx={{ height: 900, width: '100%' }}>
              <ReadersTable ></ReadersTable>
          </Box>
        </>

        );
}