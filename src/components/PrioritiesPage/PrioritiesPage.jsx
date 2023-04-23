import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Slab',
    ],
  },
  palette: {
    primary: {
      main: '#475473',
    },
    secondary: {
      main: '#1c4bd9',
    },
    info: {
      main: '#bdbfbf',
    },
  },
});


function PrioritiesPage() {

  const user = useSelector((store) => store.user);
  const priorities = useSelector(store => store.priorities);
    // Dispatch to GET the list of unordered categories happens in app.jsx
  const history = useHistory();
  const dispatch = useDispatch();

  // Local state to track order of items
  const [itemList, setItemList] = useState(priorities);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore if dropedp outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update state array
    setItemList(updatedList);
  };
  
  // Handles SAVE - - - submits ranked priorities to database
  const saveAnswers = () => {
    // bundling of ranked user input for dispatch:
    const rankedList = [
      {rank: 1, category_id: parseInt(`${itemList[0].id}`)},
      {rank: 2, category_id: parseInt(`${itemList[1].id}`)},
      {rank: 3, category_id: parseInt(`${itemList[2].id}`)},
      {rank: 4, category_id: parseInt(`${itemList[3].id}`)},
      {rank: 5, category_id: parseInt(`${itemList[4].id}`)},
      {rank: 6, category_id: parseInt(`${itemList[5].id}`)},
      {rank: 7, category_id: parseInt(`${itemList[6].id}`)},
      {rank: 8, category_id: parseInt(`${itemList[7].id}`)},
      {rank: 9, category_id: parseInt(`${itemList[8].id}`)},
      {rank: 10, category_id: parseInt(`${itemList[9].id}`)}
    ]

    console.log('RANKED:', rankedList);
    console.log('SAVE clicked');
    dispatch({
        type: 'UPDATE_PRIORITIES',
        payload: rankedList
      });
  }
  // Fetch priorities on page load
  useEffect(() => {
    dispatch({type: 'FETCH_PRIORITIES'});
  }, [])

  // Second use effect that listens for changes to priorities
  useEffect(() => {
    setItemList(priorities);
  }, [priorities])

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // Handles SAVE & CONTINUE - - - only used first time user completes prioritization
  const saveAndContinue = () => {
    console.log('SAVE clicked');
    const rankedList = [
      {rank: 1, category_id: parseInt(`${itemList[0].id}`)},
      {rank: 2, category_id: parseInt(`${itemList[1].id}`)},
      {rank: 3, category_id: parseInt(`${itemList[2].id}`)},
      {rank: 4, category_id: parseInt(`${itemList[3].id}`)},
      {rank: 5, category_id: parseInt(`${itemList[4].id}`)},
      {rank: 6, category_id: parseInt(`${itemList[5].id}`)},
      {rank: 7, category_id: parseInt(`${itemList[6].id}`)},
      {rank: 8, category_id: parseInt(`${itemList[7].id}`)},
      {rank: 9, category_id: parseInt(`${itemList[8].id}`)},
      {rank: 10, category_id: parseInt(`${itemList[9].id}`)}
    ]
    dispatch({
      type: 'UPDATE_PRIORITIES',
      payload: rankedList
    });
    dispatch({
      type: 'PRIORITIES_PAGE_DONE'
    });
    history.push(`/week`);
  }


  return (
    <ThemeProvider theme={theme}>
    <div>
      <center>
        <Typography variant="h4" sx={{ fontWeight: 700 }} mt={6} mb={2} gutterBottom>
          PRIORITIZE FOR WELL-BEING.
        </Typography>
        <Typography variant="body1" mb={6} gutterBottom>Drag and drop the categories below to prioritize them, highest priority to lowest.</Typography>
        
        <div className="priority-container">
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <Box
                  sx={{
                    width: 280,
                    padding: '12px 12px 12px 12px',
                    m: 1,
                    border: `2px solid #bdbfbf`,
                    borderRadius: 2,
                  }}
                  className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
          {/* Mapping through the priorities, displayed in styled MUI Boxes */}
                  {itemList.map((item, index) => (
                    <Draggable key={item.name} draggableId={item.name} index={index}>
                      {(provided) => (
                        <Box
                          className="item-container"
                          sx={{
                            width: 250,
                            padding: '2px 0px 2px 0px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            m: 1.2,
                            border: `2px solid hsl(225, ${100-index*10}%, ${60+index*2}%)`,
                            boxShadow: 2,
                            borderRadius: 1,
                            backgroundColor: `hsl(225, ${100-index*10}%, ${70+index*3}%)`,
                            '&:hover': {
                              opacity: [0.8, 0.7, 0.6],
                            },
                          }}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <Typography>{item.name}</Typography>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <br/><br/>

        {/* SAVE button */}
        {user.prioritiesComplete &&
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={saveAnswers}>SAVE
            </Button>
            <br/><br/>
          </>
        }

        {/* SAVE & CONTINUE button - - - shows only on user's first setup visit to this page */}
        {!user.prioritiesComplete &&
         <>
           <Button
             type="submit"
             variant="contained"
             color="primary"
             size="large"
             onClick={saveAndContinue}>SAVE and CONTINUE
           </Button>
           <br/><br/>
         </>
       }


    </center>
  </div>
  </ThemeProvider>
  );
}

export default PrioritiesPage;