import React from 'react';
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
export default function DonationDetails({ config, setConfig }) {
    return (
        <div className="form-content">
            <FormControl fullWidth>
                <InputLabel variant="outlined" sx={{m:1}}>Default Amount</InputLabel>
                <OutlinedInput
                    sx={{m:1}}
                    id="outlined-adorment-amount"
                    label="Default Amount"
                    value={config.amount}
                    onChange={(event) => setConfig({ ...config, amount: event.target.value})}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />

            </FormControl>
        </div>
    )
}
