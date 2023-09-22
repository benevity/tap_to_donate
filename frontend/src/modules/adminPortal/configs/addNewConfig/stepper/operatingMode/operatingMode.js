import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function OperatingMode({config, setConfig}){
      return (
        <FormControl>
          <RadioGroup
            sx={{m:3}}
            aria-labelledby="operation mode radio-buttons"
            name="radio-buttons-group"
            value={config.operating_mode}
            onChange={(event)=>setConfig({...config, operating_mode:event.target.value})}
          >
            <FormControlLabel  value={0} control={<Radio />} label="Mode 0: Annonymous donations" />
            <FormControlLabel  value={1} control={<Radio />} label="Mode 1: Give donor an option to request receipt" />
            <FormControlLabel  value={2} control={<Radio />} label="Mode 2: Give donor an option to select amount and request receipt" />
            <FormControlLabel  value={3} control={<Radio />} label="Mode 3: Give donor an option to select recipient, amount and request receipt" />
          </RadioGroup>
        </FormControl>
      );
    }