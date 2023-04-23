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
      main: "#1c4bd9",
    },
    info: {
      main: "#bdbfbf",
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

const ActivityModal = ({ activities, activity, open, onClose }) => {
  const [overlapError, setOverlapError] = useState(false);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    start_time: "",
    end_time: "",
    category_id: "",
    day: "",
  });

  useEffect(() => {
    if (activity) {
      setFormValues({
        day: activity?.day || "",
        start_time: activity?.start_time?.slice(0, -3) || "", // trim last 3 characters
        end_time: activity?.end_time?.slice(0, -3) || "", // trim last 3 characters
        category_id: activity?.category_id || "",
      });
    }
  }, [activity]);
  const [startTimeError, setStartTimeError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_ACTIVITY", payload: activity.id });
    onClose();
  };

  const handleUpdate = () => {
    const start = new Date(`1970-01-01T${formValues.start_time}:00.001Z`);
    const end = new Date(`1970-01-01T${formValues.end_time}:00.001Z`);

    if (end <= start) {
      setStartTimeError(true);
      return;
    }

    let total_hours = ((end - start) / (1000 * 60 * 60)).toFixed(2);
    const existingActivities = activities.filter((a) => {
      const aStartTime = new Date(`1970-01-01T${a.start_time}.001Z`);
      const aEndTime = new Date(`1970-01-01T${a.end_time}.001Z`);
      const activityStartTime = new Date(
        `1970-01-01T${formValues.start_time}:00.001Z`
      );
      const activityEndTime = new Date(
        `1970-01-01T${formValues.end_time}:00.001Z`
      );

      return (
        a.day === activity.day &&
        a !== activity &&
        ((aStartTime >= activityStartTime && aStartTime < activityEndTime) ||
          (activityStartTime >= aStartTime && activityStartTime < aEndTime) ||
          (aEndTime > activityStartTime && aEndTime <= activityEndTime) ||
          (activityEndTime > aStartTime && activityEndTime <= aEndTime))
      );
    });

    if (existingActivities.length > 0) {
      setOverlapError(true);
    } else {
      const updatedActivity = {
        ...formValues,
        id: activity.id,
        total_hours,
      };
      dispatch({ type: "UPDATE_ACTIVITY", payload: updatedActivity });

      onClose();
      setOverlapError(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {activity && (
          <Box sx={style}>
            <Typography
            variant="h5"
            sx={{ fontWeight: 700 }}
            mb={3}
            gutterBottom
          >
            EDIT ACTIVITY
          </Typography>
            <FormControl fullWidth>
              <Typography>Select Category</Typography>
              <Select
                name="category_id"
                value={formValues.category_id}
                onChange={handleChange}
              >
                <MenuItem value={0}></MenuItem>
                <MenuItem value={1}>Sleep</MenuItem>
                <MenuItem value={2}>Self-Care</MenuItem>
                <MenuItem value={3}>Family and Relationships</MenuItem>
                <MenuItem value={4}>Personal Development</MenuItem>
                <MenuItem value={5}>Nutrition</MenuItem>
                <MenuItem value={6}>Leisure Time</MenuItem>
                <MenuItem value={7}>Community Involvement</MenuItem>
                <MenuItem value={8}>Creativity</MenuItem>
                <MenuItem value={9}>Work</MenuItem>
                <MenuItem value={10}>Measure What Matters</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="start_time"
              type="time"
              value={formValues.start_time}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="end_time"
              type="time"
              value={formValues.end_time}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            {overlapError && (
              <Typography variant="body2">
                There is an overlap with another activity on this day and time.
              </Typography>
            )}
            {startTimeError && (
              <Typography variant="body2">
                Start time must come before end time.
              </Typography>
            )}
            <Box sx={{mt: '10px'}}>
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
                sx={{mx: '10px'}}
              >
                Update
              </Button>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </ThemeProvider>
  );
};

export default ActivityModal;
