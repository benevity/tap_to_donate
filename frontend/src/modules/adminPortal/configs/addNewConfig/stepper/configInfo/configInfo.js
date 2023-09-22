import React from 'react';
import TextField from "@mui/material/TextField"
export default function ConfigInfo({ config, setConfig }) {
    return (
        <div className="form-content">
                    <TextField
                        sx={{m:1}}
                        label="Config Name"
                        value={config.name}
                        onChange={(event) => setConfig({ ...config, name: event.target.value })}
                    ></TextField>
                    <TextField
                        sx={{m:1}}
                        label="Recipient Name"
                        value={config.title}
                        onChange={(event) => setConfig({ ...config, title: event.target.value })}
                        multiline
                        rows={2}
                    ></TextField>
                    <TextField
                        sx={{m:1}}
                        label="Summary"
                        value={config.summary}
                        onChange={(event) => setConfig({ ...config, summary: event.target.value })}
                        multiline
                        rows={4}
                    ></TextField>
        </div>
    )
}
