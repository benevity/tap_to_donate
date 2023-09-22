import { useEffect, useState } from 'react';
import { getReadersTable } from '../../../services/dbAPI';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
export default function ReadersTable({setSelectedReaderRow}) {
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
            field: 'location_address',
            headerName: 'Address',
            width: 300,
        },
        {
            field: 'activated_dts',
            headerName: 'Activated On',
            width: 100,
            valueFormatter: (params) => {
                if (params.value != null) {
                    return params.value.replace('T', " ").replace('.000Z', "");
                }
            },
        },
    ];
    const [dbData, setDbData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let data;
        let isMounted =true;
        async function getTable() {
            data = await getReadersTable();
            if(isMounted){
                setDbData(data);
                setIsLoading(false);
            }
        }

        getTable();
        return()=>{isMounted=false};
    }, [])

    return (
        <>
            <DataGrid
                rows={dbData}
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
                onCellClick={setSelectedReaderRow} //select all info in the row
            />
        </>
    )
} 