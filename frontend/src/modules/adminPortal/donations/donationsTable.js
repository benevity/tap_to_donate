import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function DonationsTable({dbData,isLoading}) {
    const columns = [
        { 
            field: 'benevity_donation_id', 
            headerName: 'Benevity Donation ID', 
            width: 200, 
            hideable: false 
        },
        {
            field: 'stripe_payment_id',
            headerName: 'Stripe Pyament ID',
            width: 250,
        },
        {
            field: 'reader_serial_number',
            headerName: 'Reader SN',
            width: 150,
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
            field: 'currency',
            headerName: 'Currency',
            width: 70,
        },
        {
            field: 'anonymous',
            headerName: 'Anonymous?',
            width: 50,
        },
        {
            field: 'recipient_name',
            headerName: 'Recipient name',
            width: 200,
        },
        {
            field: 'recipient_id',
            headerName: 'Recipient ID',
            width: 200,
        },
        {
            field: 'transaction_dts',
            headerName: 'Transaction Date',
            width: 130,
            valueFormatter: (params) => {
                if (params.value != null) {
                    return params.value.replace('T', " ").replace('.000Z', "");
                }
            },
        },
    ];

    return (
        <>
            <DataGrid
                rows={dbData}
                columns={columns}
                components={
                    {
                        Toolbar: GridToolbar,
                    }}
                getRowId={(data) => data.benevity_donation_id}//for rows with custom id
                getRowHeight={() => "auto"}// auto row height to fit long text
                // pageSize={25}
                disableMultipleSelection={true}
                loading={isLoading}
            />
        </>
    )
} 