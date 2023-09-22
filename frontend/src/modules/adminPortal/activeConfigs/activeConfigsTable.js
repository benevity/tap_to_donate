import { useEffect, useState } from 'react';
import { getActiveConfigsTable} from '../../../services/dbAPI';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
export default function ActiveConfigsTable() {
    const columns = [
        { 
            field: 'reader_serial_number', 
            headerName: 'Serial Number', 
            width: 248, 
            hideable: false 
        },
        {
            field: 'label',
            headerName: 'Label',
            width: 200,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 200,
        },
        {
            field: 'title',
            headerName: 'Cause Name',
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
            field: 'assigned_dts',
            headerName: 'Assigned On',
            width: 100,
            valueFormatter: (params) => {
                if (params.value != null) {
                    return params.value.replace('T', " ").replace('.000Z', "");
                }
            },
        },
    ];
    const [rowsData, setRowsData] = useState([]); //rows data pulled from DB
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let data;
        let isMounted =true;
        async function getTableData() {
            data = await getActiveConfigsTable();
            if(isMounted){
                setRowsData(data);
                setIsLoading(false);
            }
        }

        getTableData();
        return()=>{isMounted=false};
    }, [])

    return (
        <>
            <DataGrid
                rows={rowsData}
                columns={columns}
                components={
                    {
                        Toolbar: GridToolbar,
                    }}
                getRowId={(data) => data.reader_serial_number}//for rows with custom id
                getRowHeight={() => "auto"}// auto row height to fit long text
                pageSize={30}
                disableMultipleSelection={true}
                loading={isLoading}
            />
        </>
    )
} 