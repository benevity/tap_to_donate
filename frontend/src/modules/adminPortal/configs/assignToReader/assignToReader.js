import {useState} from 'react';
import {Box, Button} from '@mui/material';
import { ButtonsWrapper } from '../../../../styles/wrapper-components';
import { assignConfigToReader} from '../../../../services/dbAPI';
import ReadersTable from '../../readers/readersTable';

export default function AssignToReader({showAssignToReader, selectedRow }) {
    const [selectedReaderRow, setSelectedReaderRow]= useState({});
    async function handleAssign(){
        await assignConfigToReader(selectedRow.row.config_id, selectedReaderRow.row.reader_serial_number);
        showAssignToReader(false);
    }

    function handleCancel() {
        showAssignToReader(false);
    }
    return (
        <>
            <Box sx={{height:500}}>
                <ReadersTable setSelectedReaderRow={setSelectedReaderRow}></ReadersTable>
            </Box>
            <ButtonsWrapper>
                <Button color="inherit" variant="contained" onClick={handleCancel}>Cancel</Button>
                <Button color="primary" variant="contained" onClick={handleAssign}>Assign</Button>
            </ButtonsWrapper>
        </>
    )
}