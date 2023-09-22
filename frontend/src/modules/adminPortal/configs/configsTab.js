import {useState} from 'react';
import Button from "@mui/material/Button"
import Box from '@mui/material/Box';
import ConfigsTable from './configsTable';
import {ButtonsWrapper, DialogWrapper, DialogContainer, DialogHeader, DialogTitle, CloseDialog, DialogContentWrapper} from "../../../styles/wrapper-components";
import CloseIcon from '../../../assets/images/close.png';
import AddNewConfig from './addNewConfig/addNewConfig';
import RemoveConfig from './removeConfig/removeConfig';
import AssignToReader from './assignToReader/assignToReader';

export default function ConfigsTab() {
    const [render, setRender] = useState(0);// counter used to fetch new table data on each update
    const [addNewConfig, showAddNewConfig]=useState(false); //add new config popup
    const [removeConfig, showRemoveConfig]=useState(false); //remove selected config popup
    const [assignToReader,showAssignToReader]=useState(false); //assign to reader popup
    const [selectedRow, setSelectedRow]=useState({});
    const [isLoading, setIsLoading] = useState(true)

    function closePopUpWindows(){
        if(addNewConfig){showAddNewConfig(false)}
        if(removeConfig){showRemoveConfig(false)}
        if(assignToReader){showAssignToReader(false)}
    }
    return (
        <>
            <ButtonsWrapper>
                <div>
                    <Button variant="contained" color="primary" disabled={JSON.stringify(selectedRow)==="{}"} onClick={()=>showAssignToReader(true)}>Assign to Reader</Button>
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={()=>showAddNewConfig(true)}>New</Button>
                    {/* <Button variant="contained" color="primary" disabled={JSON.stringify(selectedRow)==="{}"} >Edit</Button> */}
                    <Button variant="contained" color="primary" disabled={JSON.stringify(selectedRow)==="{}"} onClick={()=>showRemoveConfig(true)}>Remove</Button>
                </div>
            </ButtonsWrapper>
            {(addNewConfig||removeConfig || assignToReader) && 
            <DialogWrapper>
                    <DialogContainer>
                        <DialogHeader>
                            {addNewConfig && <DialogTitle> Create New Config</DialogTitle>}
                            {removeConfig && <DialogTitle> Remove Config?</DialogTitle>}
                            {assignToReader&& <DialogTitle> Assign Config</DialogTitle>}
                            <CloseDialog onClick={closePopUpWindows}>
                                <img src={CloseIcon} alt="Close Dialog" />
                            </CloseDialog>
                        </DialogHeader>
                        <DialogContentWrapper className="form-wrapper">
                            <div className="form-content">
                                {addNewConfig&& <AddNewConfig setIsLoading={setIsLoading} render={render} setRender={setRender} showAddNewConfig={showAddNewConfig}></AddNewConfig>}
                                {removeConfig &&<RemoveConfig setIsLoading={setIsLoading} render={render} setRender={setRender} showRemoveConfig={showRemoveConfig} selectedRow={selectedRow}></RemoveConfig>}
                                {assignToReader && <AssignToReader showAssignToReader={showAssignToReader} selectedRow={selectedRow}></AssignToReader>}
                            </div>
                        </DialogContentWrapper>
                    </DialogContainer>
            </DialogWrapper>
            }
          <Box sx={{ height: 900, width: '100%' }}>
            <ConfigsTable isLoading={isLoading} setIsLoading={setIsLoading} 
                            render={render} 
                            setSelectedRow={setSelectedRow}>
            </ConfigsTable>
          </Box>
        </>
    )
}