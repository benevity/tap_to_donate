import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeColor, whiteColor } from "../../styles/colors"
import React from 'react';

const SimpleTopHeader = React.forwardRef((props,ref) =>{

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
    return (
        <div {...props} ref={ref}>
            <ThemeProvider theme={theme}>
                <AppBar position="sticky">
                    <Toolbar>
                        {/* <Box
                            component="img"
                            sx={{
                                height: 50,
                                width: 200,
                            }}
                            alt="Benevity logo"
                            src="benevity-logo.png"
                            align="center"
                        /> */}
                        <Typography align="center" variant="h4" component="div" sx={{ flexGrow: 1 }}>
                            Tap to Donate
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    )

})
export default SimpleTopHeader;