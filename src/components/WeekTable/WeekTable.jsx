import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
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

export default function BasicTable() {
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);
  const priorities = useSelector((store) => store.priorities);

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVITIES" });
    dispatch({ type: "FETCH_PRIORITIES" });
  }, []);

  const activitiesSorted = activities.sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );

  const prioritiesWthActvts = priorities.map((category) => {
    category.activities = activitiesSorted.filter(
      ({ category_id }) => category_id === category.id
    );
    return category;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box px={5}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Priorities</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Monday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Tuesday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Wednesday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Thursday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Friday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Saturday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Sunday
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prioritiesWthActvts.map(({ id, name, activities }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Monday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Tuesday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Wednesday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Thursday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Friday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Saturday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .filter((activity) => activity.day === "Sunday")
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {activities
                      .map((activity) => parseFloat(activity.total_hours))
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
