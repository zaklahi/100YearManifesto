import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto-slab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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

function QuestionsPage() {
  const user = useSelector((store) => store.user);
  const questions = useSelector((store) => store.questions);
  const answers = useSelector((store) => store.answers);
  const categories = useSelector((store) => store.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  // this is be assigned the user-selected category from drop-down and used to filter questions:
  const [categoryFilter, setCategoryFilter] = useState("");

  console.log("#1 answer:", answers);
  // console.log('#2 answer:', stateAnswers.q2A);

  // Dispatch (on page load) to GET all the questions
  // (Categories are fetched in app.jsx)
  useEffect(() => {
    dispatch({ type: "FETCH_QUESTIONS" });
    dispatch({ type: "FETCH_ANSWERS" });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handles filtering to show only questions from the user-selected category
  const categoryFilterHandler = (item) => {
    if (!categoryFilter) {
      return;
    } else if (item.category_id == categoryFilter) {
      return item;
    }
  };

  // handles changes to answers being set in local state object
  const handleAnswerChange = (id, value) => {
    const key = `${id}`;
    dispatch({
      type: "UPDATE_SINGLE_ANSWER",
      payload: {
        key,
        value,
      },
    });
  };

  // Handles SAVE - - - submits ALL answers/changes to database at once
  // This button shows only when user comes back to edit answers after initial setup
  const saveAnswers = () => {
    console.log("SAVE clicked");
    dispatch({
      type: "SET_ANSWERS",
      payload: answers,
    });
  };

  // Handles SAVE & CONTINUE - - - submits all answers AND routes to PRIORITIZAION
  // This button only shows until user has clicked it once to continue setup steps
  const saveAndContinue = () => {
    console.log("SAVE & CONTINUE clicked");
    dispatch({
      type: "SET_ANSWERS",
      payload: answers,
    });
    // set questionsComplete to TRUE:
    dispatch({
      type: "QUESTIONS_PAGE_DONE",
    });
    history.push(`/priorities`);
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
          <Typography
            variant="h4"
            sx={{ fontWeight: 700 }}
            mt={0}
            mb={2}
            gutterBottom
          >
            ON PURPOSE, WITH PURPOSE.
          </Typography>
          <center>
            <Typography variant="body1" px={10} mb={7} gutterBottom>
              Take a moment to pause, collect your thoughts, and engage in these
              reflective questions. Remember, your Ideal Living Week is a
              flexible concept, and you can always make adjustments and modify
              your answers as you progress in your journey towards a more
              intentional life - a life on purpose with Purpose.
            </Typography>
          </center>

          {/* DROPDOWN input for FILTERING by CATEGORY — temporarily hardcoded */}
          <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              sx={{ width: "300px" }}
              labelId="category"
              id="category"
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />

          {/* Loop through questions, showing those which match category */}
          {/* <div className="questionsTrioContainer"> */}
          <Box>
            {questions.length > 0 && (
              <div>
                {categoryFilter ? (
                  <div>
                    {questions.filter(categoryFilterHandler).map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="qAndAContainer">
                            <Typography sx={{ width: 500 }} mt={2} mb={2}>
                              {item.question_text}
                            </Typography>
                            <TextField
                              id="answer"
                              label="Your Response"
                              sx={{ width: 500 }}
                              multiline
                              rows={3}
                              variant="outlined"
                              value={answers[`${item.id}`]}
                              onChange={(e) =>
                                handleAnswerChange(item.id, e.target.value)
                              }
                            />
                          </div>
                          <br />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    Please select a category to view questions.
                  </Typography>
                )}
              </div>
            )}
          </Box>
          {/* </div> */}
          <br />
          <br />

          {/* SAVE button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAnswers}
          >
            SAVE PROGRESS
          </Button>
          <br />
          <br />

          {/* SAVE & CONTINUE button — only shows when user is first led through setup */}
          {!user.questionsComplete && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={saveAndContinue}
            >
              SAVE and CONTINUE
            </Button>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default QuestionsPage;
