import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* editQuestions(action) {
  try {
    console.log("in editQuestions");
    yield axios.put("/api/question", action.payload);
    yield put({ type: "FETCH_QUESTIONS" });
    console.log(action.payload);
  } catch (error) {
    console.log("Error with session edit:", error);
  }
}
function* editQuestionsSaga() {
  yield takeEvery("UPDATE_QUESTIONS", editQuestions);
}

export default editQuestionsSaga;