import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Nav.css';
import Logo from './100YM-ILY_logo_white.png';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/roboto-slab";
import Typography from '@mui/material/Typography';

// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Slab',
    ],
  },
});

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
    <div className="nav">
      <Link to="/home">
        <img className="logo" src={Logo} alt="logo"/>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            <Typography>Login / Register</Typography>
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* These links only show up once setupComplete for user is TRUE in DB */}
            {user.setupComplete &&
              <>
                <Link className="navLink" to="/user">
                  <Typography>Home</Typography>
                </Link>

                <Link className="navLink" to="/week">
                  <Typography>Week</Typography>
                </Link>

                <Link className="navLink" to="/priorities">
                  <Typography>Priorities</Typography>
                </Link>

                <Link className="navLink" to="/questions">
                  <Typography>Questions</Typography>
                </Link>
              </>
            }

            <span className="navLink">
              <Typography onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</Typography>
            </span>

          </>
        )}

        {/* If a user is admin, show this link - UNTESTED */}
        {user.admin && (
          <>
            <Link className="navLink" to="/admin">
            <Typography>Admin</Typography>
            </Link>
          </>
        )}

      </div>
    </div>
    </ThemeProvider>
  );
}

export default Nav;
