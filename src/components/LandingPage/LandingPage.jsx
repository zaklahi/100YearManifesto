import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto-slab";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

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

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography px={10} variant="h4" mt={4} mb={2}>
          {heading}
        </Typography>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <Box px={10}>
              <Typography>
                The Ideal Living Week app is designed to help individuals create
                their ideal week based on their personal values and priorities
                (after completing their 100 Year Manifesto).
              </Typography>
              <br />

              <Typography>
                The app encourages users to prioritize their well-being and
                relationships before work or other commitments. By designing a
                week that prioritizes self-care and quality time with loved
                ones, users can achieve a healthier, more fulfilled life.
              </Typography>
              <br />

              <Typography>
                The Ideal Living Week app empowers individuals to take control
                of their lives and create the week they truly want. By
                allocating time for activities that align with their values and
                priorities, users can achieve a sense of balance and
                fulfillment.
              </Typography>
              <br />
            </Box>
          </div>

          <div className="grid-col grid-col_4">
            <RegisterForm />
            <center>
              <h4>Already a Member?</h4>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onLogin}
              >
                LOG IN
              </Button>
            </center>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;
