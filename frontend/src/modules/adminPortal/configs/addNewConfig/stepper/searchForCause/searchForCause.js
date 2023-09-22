import React, { useState } from "react";
import CausesTable from "./causesTable";
import Button from "@mui/material/Button";
import {Select,MenuItem, FormControl, InputLabel, OutlinedInput, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import { countryList, canadaProvinces, usStates} from "./Country-StateList";
export default function SearchForCause({config, setConfig}) {
    const [searchData, setSearchData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState({//search query used with benevity api
        searchQ: "",
        country: "",
        state: "",
        page:"1",
    });
    const [queryString, setQueryString] = useState("");
    async function searchHandler() {
        setQueryString(`?q=${searchQuery.searchQ}&state=${searchQuery.country}-${searchQuery.state}`);
    }

    return (<>
        <Box sx={{mt:2}}>
            <FormControl> 
                <TextField
                    sx={{ m:1, width:'55ch'}}
                    label="Cause keywords"
                    value={searchQuery.searchQ}
                    onChange={(event) => setSearchQuery({ ...searchQuery, searchQ: event.target.value })}
                />
            </FormControl>
            <FormControl>
                <InputLabel
                sx={{m:1}}>Country</InputLabel>
                <Select
                    sx={{ m: 1, width:'30ch'}}
                    label="Country"
                    value={searchQuery.country}
                    onChange={(e) => { setSearchQuery({ ...searchQuery, country: e.target.value}); }}
                >
                    {Object.entries(countryList).map(([key, value]) => { return <MenuItem key={key} value={key}>{value}</MenuItem> })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel sx={{m:1}}>{searchQuery.country == "US" ? "State" : "Province"}</InputLabel>
                <Select
                    sx={{ m: 1,width:'30ch' }}
                    disabled={searchQuery.country == ""}
                    label="State"
                    value={searchQuery.state}
                    onChange={(e) => { setSearchQuery({ ...searchQuery, state: e.target.value }); }}
                >
                    {searchQuery.country == "CA"
                        ?
                        Object.entries(canadaProvinces).map(([key, value]) => { return <MenuItem key={key} value={key}>{value}</MenuItem> })
                        :
                        Object.entries(usStates).map(([key, value]) => { return <MenuItem key={key} value={key}>{value}</MenuItem> })
                    }
                </Select>
            </FormControl>
            <Button sx={{mt:2}} variant="contained" color="primary" onClick={searchHandler}>Search </Button>
        </Box>
        <h3>Search Results: </h3>
        <Box sx={{height:450}}>
            {/* {(Object.keys(searchData).length!==0) && <CausesTable searchData={searchData.data} */}
                <CausesTable
                    queryString={queryString}
                    searchData={searchData.data}
                    config={config}
                    setConfig={setConfig}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
            ></CausesTable>
        </Box>
    </>)
}