import React , { useState } from 'react';
import {Button, CssBaseline,TextField,FormControlLabel,Checkbox,Box,Typography,Container} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {themeColor} from "../../styles/colors"

const theme = createTheme({
    palette: {
      //neutral: {
      primary: {
        main: themeColor,
        contrastText: '#fff',
      },
    },
    typography: {
      button: {
        fontWeight: 500,
      },
    },
  });
// var state = true;
export default function Login() {
  const [validPassword, setValidPassword] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
    // call backend with this info
    // const response = fetch(`http://localhost:8080/login/${data.get('email')}/${data.get('password')}`).then(response =>{
    //   return response.json();
    // }).then(json =>{
    //     console.log("it worked" ,json);
    //     setValidPassword(json);
    //     // if(json){window.location.href = 'http://localhost:3000/home';}
    //     if(json){window.location.href = '/home';}
    // });
    window.location.href='admin-portal' ;//match with routes/routes.js
  };

  const onChange = (event) => {
    setValidPassword(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography align="center" component="h1" variant="h5">
            Administrative Panel
            <br></br>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                error={!validPassword}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue =""
              onChange={onChange}
            />
            <TextField
              error={!validPassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue =""
              onChange={onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}