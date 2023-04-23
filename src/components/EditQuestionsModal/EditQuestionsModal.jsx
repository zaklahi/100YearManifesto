import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Slab"],
  },
  palette: {
    primary: {
      main: "#475473",
    },
    secondary: {
      main: "#1C4BD9",
    },
    info: {
      main: "#BDBFBF",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const EditQuestionsModal = ({ question, open, onClose }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    question_text: "",
  });

  useEffect(() => {
    if (question) {
      setFormValues({
        question_text: question?.question_text || "",
      });
    }
  }, [question]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedQuestion = {
      ...formValues,
      id: question.id,
    };
    dispatch({ type: "UPDATE_QUESTIONS", payload: updatedQuestion });
    console.log('updatedQuestion:', updatedQuestion);
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >

        {question && (
          <Box sx={style}>
            <Typography
            variant="h5"
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            EDIT QUESTION
          </Typography>
            <TextField
              name="question_text"
              type="text"
              value={formValues.question_text}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              sx={{mb: '15px'}}
              fullWidth
            />
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Update
            </Button>
          </Box>
        )}
      </Modal>
    </ThemeProvider>
  );
};

export default EditQuestionsModal;