import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

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

function RegisterPage() {
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <RegisterForm />
        <center>
          <ButtonBase
            className="btn btn_asLink"
            onClick={() => {history.push('/login')}}
          >
            <Typography>Login</Typography>
          </ButtonBase>
        </center>
      </div>
    </ThemeProvider>
  );
}

export default RegisterPage;
