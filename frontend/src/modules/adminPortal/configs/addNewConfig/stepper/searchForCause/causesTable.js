import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, selectedGridRowsCountSelector } from '@mui/x-data-grid';
import { searchForCauses } from '../../../../../../services/dbAPI';
export default function CausesTable({setConfig,config,queryString,isLoading,setIsLoading}) {
    const columns = [
        { 
            field: 'id', 
            headerName: 'Id', 
            width: 150, 
            hideable: false 
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            valueGetter:(params)=>{
                return params.getValue(params.id,"attributes").name;
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 500,
            valueGetter:(params)=>{
                return params.getValue(params.id,"attributes").description;
            }
        },
        {
            field: 'city',
            headerName: 'City',
            width: 100,
            valueGetter:(params)=>{
                return params.getValue(params.id,"attributes").city;
            }
        },
        {
            field: 'state',
            headerName: 'Province/State',
            width: 80,
            valueGetter:(params)=>{
                return params.getValue(params.id,"attributes").state.name;
            }
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 80,
            valueGetter:(params)=>{
                return params.getValue(params.id,"attributes").country.name;
            }
        },
    ];  

    const [dbData, setDbData]= useState([]);
    useEffect(() => {
        let data;
        let isMounted =true;
        async function getTable() {
            console.log('fetching data')
            data = await searchForCauses(queryString);
            if(isMounted){
                setDbData(data.data);
                console.log(data.data)
            setIsLoading(false);
            }
        }

        if(queryString!=""){
            console.log('use effect is running')
            setIsLoading(true);
            getTable();
            return()=>{isMounted=false};
        }
    }, [queryString]) //runs on query string change 
    function handleCellClick(param,event){
        setConfig({...config,recipient_id:param.id,title:param.row.attributes.name});
    }
    return (
        <DataGrid
            loading={isLoading}
            components={
                {
                    Toolbar: GridToolbar,
                }}
            getRowId={(data) => data.id}//for rows with custom id
            getRowHeight={() => "auto"}// auto row height to fit long text
            rows={dbData}
            columns={columns}
            pageSize={25}
            disableMultipleSelection={true}
            onCellClick={handleCellClick} //select all info in the row
        />
    )
} 