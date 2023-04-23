import React, { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
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

function IntroPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const answers = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
    25: "",
    26: "",
    27: "",
    28: "",
    29: "",
    30: "",
  };

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const postAndContinue = () => {
    console.log("SAVE & CONTINUE clicked");
    dispatch({
      type: "POST_ANSWERS",
      payload: answers,
    });
    // set introComplete to TRUE so this user will not come back to this page:
    dispatch({
      type: "INTRO_PAGE_DONE",
    });
    history.push(`/questions`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Box px={10}>
          <Typography variant="h4" mt={0} mb={4} gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1" mb={6}>
            Welcome to Ideal Living Week powered by the 100 Year Manifesto,
            where intentional living is at the heart of everything we do. We
            believe that life is too short to be lived on autopilot. Be
            deliberate with your time and create a life that aligns with your
            true purpose. The Ideal Living Week offers a range of powerful tools
            and features to support you in prioritizing what truly matters,
            including questions for reflection, a place to prioritize your
            values, and a "Create Your Own Ideal Living Week" tool that allows
            you to design your life on purpose with Purpose.
          </Typography>
          <Typography variant="body1" mb={6}>
            Get ready for a life-changing journey of self-discovery and personal
            growth. Take a deep breath and let's embark on this adventure
            together. The Ideal Living Week is more than just a productivity app
            - it's a mindset shift that empowers you to take control of your
            time, energy, and priorities, and live a life that is truly
            meaningful, significant and fulfilling. To get life right.
          </Typography>
          <Typography variant="body1" mb={9}>
            Your ideal life awaits! Let’s get started.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={postAndContinue}
          >
            NEXT
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default IntroPage;
