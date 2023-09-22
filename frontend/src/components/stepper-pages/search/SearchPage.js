import React, { useState } from "react";
import { Box,Button, Stack,Select, MenuItem, FormControl, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { countryList, canadaProvinces, usStates } from "../Country-StateList";
import SearchResultsCard from "./searchResultsCard";

export default function SearchPage({ causes, setCauses, setDonationCause, setIsLoading}) {
    const [searchQuery, setSearchQuery] = useState({
        searchQ: "",
        country: "",
        state: "",
        page: "1",
    });
    const [queryString, setQueryString] = useState("");
    async function searchHandler() {
        let searchState = "";
        if(searchQuery.country && searchQuery.state)
            searchState = `&state=${searchQuery.country}-${searchQuery.state}`

        setQueryString(`?q=${searchQuery.searchQ}${searchState}`);
    }

    return (<>
        <Box sx={{ mt: 2,width:"100%",maxWidth:800 }}>

            <Stack justifyContent="center">
            <FormControl>
                <TextField
                    sx={{ m: 1, width: '100%',maxWidth:800 }}
                    label="Cause keywords"
                    value={searchQuery.searchQ}
                    onChange={(event) => setSearchQuery({ ...searchQuery, searchQ: event.target.value })}
                />
            </FormControl>
            <Stack direction="row" justifyContent="space-around" sx={{maxWidth:800}}>
                <FormControl>
                    <InputLabel
                        sx={{ m: 1 }}>Country</InputLabel>
                    <Select
                        sx={{ m: 1, width: 250 }}
                        label="Country"
                        value={searchQuery.country}
                        onChange={(e) => { setSearchQuery({ ...searchQuery, country: e.target.value }); }}
                    >
                        {Object.entries(countryList).map(([key, value]) => { return <MenuItem key={key} value={key}>{value}</MenuItem> })}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel sx={{ m: 1 }}>{searchQuery.country == "US" ? "State" : "Province"}</InputLabel>
                    <Select
                        sx={{ m: 1, width:250 }}
                        disabled={searchQuery.country == ""}
                        label={searchQuery.country == "US" ? "State" : "Province"}
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
                <Button sx={{m:1}} variant="contained" color="primary" onClick={searchHandler}>Search </Button>
            </Stack>
            </Stack>
        </Box>
        <Box sx={{width:"50vw" }}>
            <SearchResultsCard setIsLoading={setIsLoading} causes={causes} setCauses={setCauses} setDonationCause={setDonationCause} queryString={queryString}></SearchResultsCard>
        </Box>
    </>)
}