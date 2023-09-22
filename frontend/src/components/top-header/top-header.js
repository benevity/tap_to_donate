import {AppBar, Toolbar, Typography,Button, Box} from "@mui/material"
import {createTheme, ThemeProvider } from '@mui/material/styles';
import {themeColor,whiteColor} from "../../styles/colors"

export default function TopHeader() {

  const theme = createTheme({
      palette: {
        //neutral: {
        primary: {
          main: whiteColor,
          contrastText: themeColor,
        },
      },
      typography: {
        button: {
          fontWeight: 500,
        },
      },
    });

    function handleLogOut(){
        console.log("Log out")
    window.location.href='/login' ;//match with routes/routes.js
    }
    return (
            <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>

                    <Box
                    component="img" 
                    sx={{
                        height:50,
                        width:200,
                    }}
                    alt= "Benevity logo"
                    src="benevity-logo.png"
                    />

                    <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Goodness Kiosk Portal
                    </Typography>

                    <Button color="inherit" onClick={handleLogOut}>Log Out</Button>

                </Toolbar>
            </AppBar>
            </ThemeProvider>
    )
}