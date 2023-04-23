import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

function AddActivityForm({ onAddActivity, activities, daysOfWeek }) {
  const priorities = useSelector((store) => store.priorities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_PRIORITIES" });
  }, []);

  const [activity, setActivity] = useState({
    category_id: "",
    day: "",
    start_time: "",
    end_time: "",
    total_hours: "",
  });

  const [overlapError, setOverlapError] = useState(false);
  const [invalidTimeError, setInvalidTimeError] = useState(false);
  console.log(priorities);
  const handleSubmit = (event) => {
    event.preventDefault();

    const start = new Date(`1970-01-01T${activity.start_time}:00.001Z`);
    const end = new Date(`1970-01-01T${activity.end_time}:00.001Z`);

    // Check if start time is before end time
    if (start >= end) {
      setInvalidTimeError(true);
      return;
    }

    const existingActivities = activities.filter((a) => {
      const aStartTime = new Date(`1970-01-01T${a.start_time}.001Z`);
      const aEndTime = new Date(`1970-01-01T${a.end_time}.001Z`);
      const activityStartTime = new Date(
        `1970-01-01T${activity.start_time}:00.001Z`
      );
      const activityEndTime = new Date(
        `1970-01-01T${activity.end_time}:00.001Z`
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
      onAddActivity({ ...activity });
      setActivity((prevActivity) => ({
        ...prevActivity,
        day: "",
        ...prevActivity,
        ...prevActivity,
        total_hours: "",
      }));
      setOverlapError(false);
      setInvalidTimeError(false);
    }
  };

  const handleChange = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Add an Activity
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <Typography>Priority</Typography>
            <Select
              //   sx={{ width: "100%" }}
              name="category_id"
              labelId="category"
              id="category"
              value={activity.category_id}
              onChange={handleChange}
            >
              {priorities.map((pri, index) => (
                <MenuItem key={index} value={pri.id}>
                  {pri.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <Typography>Select Day</Typography>
            <Select
              name="day"
              value={activity.day}
              onChange={handleChange}
              required
              // label="Select Day"
              // className={classes.input}
            >
              <MenuItem value="0">Select Day</MenuItem>
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <Typography>Start Time</Typography>
            <TextField
              type="time"
              name="start_time"
              value={activity.start_time}
              onChange={handleChange}
              required
              // className={classes.input}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <Typography>End Time</Typography>
            <TextField
              type="time"
              name="end_time"
              value={activity.end_time}
              onChange={handleChange}
              required
              // className={classes.input}
            />
          </FormControl>
        </Grid>
      </Grid>
      {overlapError && (
        <Typography variant="body2">
          There is an overlap with another activity on this day and time.
        </Typography>
      )}
      {invalidTimeError && (
        <Typography color="error">
          Start time must be before end time
        </Typography>
      )}
      <br />
      <FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Activity
        </Button>
      </FormControl>
    </form>
  );
}
export default AddActivityForm;
