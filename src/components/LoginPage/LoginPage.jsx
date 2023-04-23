import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

// MUI 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
import ButtonBase from '@mui/material/ButtonBase';

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

function LoginPage() {
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <LoginForm />
        <center>
          <ButtonBase
            className="btn btn_asLink"
            onClick={() => {history.push('/registration')}}
          >
            <Typography>Register</Typography>
          </ButtonBase>
        </center>
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;
