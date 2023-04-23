import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
function* postActivity(action) {
  try {
    console.log("in postActivity");
    yield axios.post("/api/idealWeek/", action.payload);
    yield put({ type: "FETCH_ACTIVITIES" });
    console.log(action.payload);
  } catch (error) {
    console.log("Error with activity post:", error);
  }
}
function* newActivitySaga() {
  yield takeEvery("POST_ACTIVITY", postActivity);
}
export default newActivitySaga;
