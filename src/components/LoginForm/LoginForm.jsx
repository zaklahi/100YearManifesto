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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <ThemeProvider theme={theme}>
    <Box className="formPanel">

      <Typography variant="h5" mb={2}>Login</Typography>

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <div>
          <TextField
            id="Username"
            label="Username"
            variant="standard"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>

      <div>
          <TextField
            id="Password"
            label="Password"
            variant="standard"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <br/>
      
      <div>
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={login}>LOGIN
          </Button>
      </div>
    </Box>
    </ThemeProvider>
  );
}

export default LoginForm;
