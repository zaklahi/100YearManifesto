import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Slab',
    ],
  },
  palette: {
    primary: {
      main: '#475473',
    },
    secondary: {
      main: '#1c4bd9',
    },
  },
});

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email
      },
    });
  }; // end registerUser

  return (
    <ThemeProvider theme={theme}>
      <Box className="formPanel">

        <Typography variant="h5" mb={2}>Register User</Typography>

        {errors.registrationMessage && (
          <Typography className="alert" role="alert">
            {errors.registrationMessage}
          </Typography>
        )}

        <div>
            <TextField
              id="Username"
              label="Username"
              variant="standard"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
        </div>

        <div>
            <TextField
              id="Password"
              label="Password"
              variant="standard"
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
        </div>

        <div>
            <TextField
              id="Email"
              label="Email"
              variant="standard"
              type="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
        </div>
        <br/>

        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={registerUser}>REGISTER
          </Button>
        </div>

      </Box>
    </ThemeProvider>
  );
}

export default RegisterForm;
