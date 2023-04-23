import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

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
      main: '#979b9b',
    },
  },
});


function AdminPage() {

  const user = useSelector((store) => store.user);
  const userList = useSelector(store => store.userList);
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Dispatch (on page load) to GET all the users
  useEffect(() => {
    dispatch({ type: 'FETCH_USERLIST' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

    // Handles EDIT QUESTIONS button click
    const goEditQuestions = () => {
      console.log("EDIT QUESTIONS clicked");
      history.push(`/editquestions`);
    };

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <div>
        <Typography variant="h4" mt={0} mb={4} sx={{ fontWeight: 700 }} gutterBottom>ADMIN PAGE</Typography>
      </div>
      {user.admin &&
      <>
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={goEditQuestions}
        >
        EDIT QUESTIONS
        </Button>
        <br/>
        <br/>
        </>
      }

      <Typography variant="h5" mt={2} mb={1} gutterBottom>USERS</Typography>
      <Box>
        {/* Conditional to avoid rendering before users array arrives from Redux store */}
        {userList.length > 0 &&
          <>
            {/* Looping over array of users */}
            {userList.map(person => {
              return(
              <div key={person.id}>
                <Stack spacing={2} direction="row" sx={{ mb: 1, mt: 1 }} alignItems="center">
                <Typography variant="body1" mt={0} mb={0} gutterBottom>{person.username}</Typography>
                <Typography variant="body1" color="secondary" mt={0} mb={0} gutterBottom>{person.email}</Typography>
                </Stack>
              </div>
            )})}
          </>
        }
      </Box>
      </Box>
    </div>
    </ThemeProvider>
  );
}

export default AdminPage;