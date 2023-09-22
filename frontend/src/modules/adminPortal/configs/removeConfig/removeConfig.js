import React from 'react';
import {Box, Button,TextField} from '@mui/material';
import { ButtonsWrapper } from '../../../../styles/wrapper-components';
import { removeConfig } from '../../../../services/dbAPI';
export default function RemoveConfig({ setIsLoading, render, setRender, showRemoveConfig, selectedRow }) {
    async function handleRemove() {
        showRemoveConfig(false);
        setIsLoading(true);
        await removeConfig(selectedRow.row.config_id);
        setRender(render + 1);
    }
    function handleCancel() {
        showRemoveConfig(false);
    }
    return (
        <>
            <Box
                sx={{ m: 2 }}
                component="form">
                <div>
                    <TextField
                        sx={{ m: 1, width: 30 }}
                        label="Id"
                        defaultValue={selectedRow.row.config_id}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    ></TextField>
                    <TextField
                        sx={{ m: 1, width: 220 }}
                        label="Name"
                        defaultValue={selectedRow.row.name}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    ></TextField>
                    <TextField
                        sx={{ m: 1, width: 220 }}
                        label="Recipient Name"
                        defaultValue={selectedRow.row.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    ></TextField>
                    <TextField
                        sx={{ m: 1, width: 265 }}
                        label="Recipient Id"
                        defaultValue={selectedRow.row.recipient_id}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    ></TextField>
                    <TextField
                        sx={{ m: 1, width: 150 }}
                        label="Amount"
                        defaultValue={`$ ${selectedRow.row.amount / 100}`}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    ></TextField>
                    <TextField
                        sx={{ m: 1, width: 50 }}
                        label="Mode"
                        defaultValue={selectedRow.row.operating_mode}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    ></TextField>
                </div>
            </Box>
            <ButtonsWrapper>
                <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                <Button color="error" variant="contained" onClick={handleRemove}>Remove</Button>
            </ButtonsWrapper>
        </>
    )
}