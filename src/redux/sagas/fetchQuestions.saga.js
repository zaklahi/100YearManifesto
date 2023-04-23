import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchQuestions() {
  try {
    const questions = yield axios.get("/api/question");
    console.log("get all:", questions.data);
    yield put({ type: "SET_QUESTIONS", payload: questions.data });
  } catch {
    console.log("get all error");
  }
}
function* questionsSaga() {
  yield takeEvery("FETCH_QUESTIONS", fetchQuestions);
}
export default questionsSaga;



