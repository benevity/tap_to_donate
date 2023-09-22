import { useEffect, useState } from 'react';
import { getConfigsTable } from '../../../services/dbAPI';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function ConfigsTable({isLoading, setIsLoading, render, setSelectedRow}) {
    const columns = [
        { 
            field: 'config_id', 
            headerName: 'Id', 
            width: 50, 
            hideable: false 
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'summary',
            headerName: 'Summary',
            width: 500,
        },
        {
            field: 'title',
            headerName: 'Recipient Name',
            width: 300,
        },
        {
            field: 'recipient_id',
            headerName: 'Recipient ID',
            width: 200,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 70,
            valueFormatter: (params) => {
                return `$ ${params.value / 100}`;
            },
        },
        {
            field: 'operating_mode',
            headerName: 'Mode',
            width: 50,
        },
        {
            field: 'start_dts',
            headerName: 'Start Date',
            width: 100,
            valueFormatter: (params) => {
                if (params.value!= null) {
                    return params.value.replace('T', " ").replace('.000Z', "");
                }
            },
        },
        {
            field: 'end_date',
            headerName: 'End Date',
            width: 100,
            valueFormatter: (params) => {
                if (params.value!= null) {
                    return params.value.replace('T', " ").replace('.000Z', "");
                }
            },
        },
        {
            field: 'created_dts',
            headerName: 'Created Date',
            width: 100,
            valueFormatter: (params) => {
                if (params.value != null) {
                    return params.value.replace('T', " ").replace('.000Z', "");
                } 
            },
        },
    ];

    const [dbData, setDbData] = useState([]);
    useEffect(() => {
        let data;
        let isMounted =true;
        async function getTable() {
            data = await getConfigsTable();
            if(isMounted){
                setDbData(data);
                setIsLoading(false);
            }
        }

        getTable();
        return()=>{isMounted=false};
    }, [render])
    return (
        <DataGrid
            components={
                {
                    Toolbar: GridToolbar,
                }}
            getRowId={(data) => data.config_id}//for rows with custom id
            getRowHeight={() => "auto"}// auto row height to fit long text
            rows={dbData}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[10]}
            
            disableMultipleSelection={true}
            loading={isLoading}
            onCellClick={setSelectedRow} //select all info in the row
        />
    )
} 