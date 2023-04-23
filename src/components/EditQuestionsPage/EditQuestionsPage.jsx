import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import EditQuestionsModal from '../EditQuestionsModal/EditQuestionsModal';

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

function EditQuestionsPage() {
  const user = useSelector((store) => store.user);
  const questions = useSelector((store) => store.questions);
  const categories = useSelector((store) => store.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  // Dispatch (on page load) to GET all the questions
  // (Categories are fetched in app.jsx)
  useEffect(() => {
    dispatch({ type: "FETCH_QUESTIONS" });
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
      type: "UPDATE_QUESTIONS",
      payload: {
        key,
        value,
      },
    });
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedQuestion({});
    setModalOpen(false);
  };

  // Handles BACK button click
  const goBack = () => {
    console.log("GO BACK clicked");
    history.push(`/admin`);
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
            mb={4}
            gutterBottom
          >
            EDIT QUESTIONS
          </Typography>

          {categoryFilter ?
            <Typography mb={4}>Click any question to edit it.</Typography>
          :
            <Typography mb={4}>Please select a category to view questions.</Typography>
          }

          {/* DROPDOWN input for FILTERING by CATEGORY */}
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
                    {questions.filter(categoryFilterHandler).map((question) => {
                      return (
                        <div key={question.id}>
                          {/* <div className="qAndAContainer"> */}
                            <Box
                              onClick={() => handleQuestionClick(question)}
                            >
                              <Typography sx={{ width: 500 }} mt={2} mb={2}>
                                {question.question_text}
                              </Typography>
                            </Box>
                            {/* <TextField
                              id="answer"
                              label="Question Text"
                              sx={{ width: 500 }}
                              multiline
                              rows={3}
                              variant="outlined"
                              value={questions[`${item.id}`]}
                              onChange={(e) =>
                                handleAnswerChange(item.id, e.target.value)
                              }
                            /> */}
                          {/* </div> */}
                          <br />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    {/* Please select a category to view questions. */}
                  </Typography>
                )}
              </div>
             )}
          </Box>
          {/* </div> */}
          <br />
          <br />

          {/* SAVE button */}
          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAnswers}
          >
            SAVE CHANGES
          </Button>
          <br />
          <br /> */}

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={goBack}
          >
            BACK
          </Button>

        </Box>

        <EditQuestionsModal
          question={selectedQuestion}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ThemeProvider>
  );
}

export default EditQuestionsPage;