import React, { useLayoutEffect } from "react";
import WeekTable from "../WeekTable/WeekTable";
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto-slab";

// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Slab"],
  },
  palette: {
    primary: {
      main: "#475473",
    },
    secondary: {
      main: "#1c4bd9",
    },
    info: {
      main: "#bdbfbf",
    },
  },
});

function UserPage() {
  const user = useSelector((store) => store.user);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography variant="h6" mb={1} px={5}>
          Welcome, {user.username}!
        </Typography>
        <Typography px={5} mb={3}>
          This is the result of your reflections - your Ideal week broken down
          into hours spent. Reflect on the data and reassess your priorities as
          needed. Navigate to those pages using the links at the top, and the
          hours table will update automatically.
        </Typography>
        <WeekTable />
      </div>
    </ThemeProvider>
  );
}

export default UserPage;
