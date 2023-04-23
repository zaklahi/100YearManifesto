import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import AddActivityForm from "../AddActivityForm/AddActivityForm";
import ActivityModal from "../ActivityModal/ActivityModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Slab"],
    textAlign: "center",
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

function WeekPage() {
  // const [activities, setActivities] = useState([]);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});
  const priorities = useSelector((store) => store.priorities);
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedActivity({});
    setModalOpen(false);
  };
  const handleAddActivity = (activity) => {
    const start = new Date(`1970-01-01T${activity.start_time}:00.000Z`);
    const end = new Date(`1970-01-01T${activity.end_time}:00.000Z`);
    const timeDiff = ((end - start) / (1000 * 60 * 60)).toFixed(2);
    const activityWithTime = { ...activity, total_hours: timeDiff };
    dispatch({ type: "POST_ACTIVITY", payload: activityWithTime });
  };

  // dispatch({ type: "POST_ACTIVITY", payload: activity });
  // setActivities([...activities, activity]);

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVITIES" });
    dispatch({ type: "FETCH_PRIORITIES" });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Handles DONE BtnClick- - - Sets setupComplete to TRUE, routes user to home
  const doneHandler = () => {
    console.log("DONE clicked");
    dispatch({
      type: "SETUP_COMPLETE",
    });
    history.push(`/user`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        px={10}
      >
        <div>
          <center>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
              mt={2}
              mb={2}
              gutterBottom
            >
              YOUR IDEAL WEEK
            </Typography>
          </center>

          <center>
            <Typography variant="body1" mt={0} px={10} mb={3} gutterBottom>
              It's essential to be intentional and purposeful in all that you do
              to live a fulfilling life. If you can't prioritize and plan your
              activities on paper, how can you expect to live them out in
              reality? Take your time and design your Ideal Living Week.
            </Typography>
          </center>
          <br />
          <center>
            {/* <div> */}
            <AddActivityForm
              onAddActivity={handleAddActivity}
              activities={activities}
              daysOfWeek={daysOfWeek}
            />
            {/* </div> */}
          </center>
          <br />
          {/* DONE button — only shows when user is initially led through setup */}
          {!user.setupComplete && (
            <center>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={doneHandler}
              >
                DONE
              </Button>
            </center>
          )}

          <br />
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mx: "4",
            }}
          >
            {daysOfWeek.map((day) => (
              // <Stack key={day} direction="row" spacing={3}>
              <FormControl key={day} fullWidth>
                <center>
                  <Typography variant="h6">{day}</Typography>
                </center>
                <center>
                  {activities
                    .filter((activity) => activity.day === day)
                    .map((activity) => {
                      const start = new Date(
                        `1971-01-01T${activity.start_time}-06:00`
                      );

                      const end = new Date(
                        `1970-01-01T${activity.end_time}-06:00`
                      );
                      const startTime = start.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      const endTime = end.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      return (
                        <Box
                          sx={{
                            width: 105,
                            padding: "2px 0px 2px 0px",
                            m: 1.2,
                            border: `2px solid hsl(225, ${
                              100 - activity.rank * 10
                            }%, ${60 + activity.rank * 2}%)`,
                            boxShadow: 2,
                            borderRadius: 1,
                            backgroundColor: `hsl(225, ${
                              100 - activity.rank * 10
                            }%, ${70 + activity.rank * 3}%)`,
                          }}
                          key={activity.id}
                          onClick={() => handleActivityClick(activity)}
                        >
                          <Typography>{activity.category_name}</Typography>
                          <Typography sx={{ fontSize: 12 }}>
                            {startTime} - {endTime}
                          </Typography>
                          <div
                            style={{
                              height: `${activity.total_hours * 30}px`,
                            }}
                          ></div>
                        </Box>
                      );
                    })}
                </center>

                <ActivityModal
                  activities={activities}
                  activity={selectedActivity}
                  open={modalOpen}
                  onClose={handleCloseModal}
                />
              </FormControl>
              // </Stack>
            ))}
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default WeekPage;
