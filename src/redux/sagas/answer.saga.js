import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAnswers() {
  try {
    const answers = yield axios.get("/api/answer");
    console.log("get all answers:", answers.data);
    yield put({ type: "UPDATE_ANSWERS", payload: answers.data });
  } catch {
    console.log("get all categories error");
  }
 }
 
// Allows user to create a post request when they input their answers
function* postAnswers(action) {
  console.log("post answers sagas action payload", action.payload)
  try {
    yield axios.post('/api/answer', action.payload); 

  } catch (error) {
   console.log('Error with creating family:', error);
    // yield put({ type: 'SET_ANSWERS' });
  };
};

function* updateAnswers(action) {
  console.log("put answers sagas action payload", action.payload)
  try {
    yield axios.put('/api/answer', action.payload); 
    yield put({ type: 'FETCH_ANSWERS' });
  } catch (error) {
   console.log('Error with creating answers:', error);
    // yield put({ type: 'UPDATE_ANSWERS' });
  };
};
function* answerSaga() {
    yield takeEvery('POST_ANSWERS', postAnswers); //will allow a dispatch from the register page
    yield takeEvery("FETCH_ANSWERS", fetchAnswers);
    yield takeEvery("SET_ANSWERS", updateAnswers);
  };
  
  export default answerSaga;