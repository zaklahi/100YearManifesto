import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
function* updateActivity(action) {
  try {
    console.log("in editActivity");
    yield axios.put("/api/idealWeek/", action.payload);
    yield put({ type: "FETCH_ACTIVITIES" });
    console.log(action.payload);
  } catch (error) {
    console.log("Error with activity put:", error);
  }
}
function* editActivitySaga() {
  yield takeEvery("UPDATE_ACTIVITY", updateActivity);
}
export default editActivitySaga;
