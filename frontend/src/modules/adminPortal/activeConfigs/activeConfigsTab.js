import Box from '@mui/material/Box';
import ActiveConfigsTable from './activeConfigsTable';
export default function ActiveConfigsTab() {
    return (
        <>
          <Box sx={{ height: 900, width: '100%' }}>
          <ActiveConfigsTable></ActiveConfigsTable>
          </Box>
        </>

        );
}