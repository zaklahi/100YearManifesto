const answersReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ANSWERS":
      //convert array of answers into an object so that the properties can be mapped to input
      const answersAsObject = {};
      action.payload.map((answer) => {
        answersAsObject[answer.question_id] = answer.response;
      });
      return answersAsObject;
    case "UPDATE_SINGLE_ANSWER":
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    default:
      return state;
  }
};

export default answersReducer;
