import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchActivities() {
  try {
    const activities = yield axios.get("/api/idealWeek");
    console.log("get all:", activities.data);
    yield put({ type: "SET_ACTIVITIES", payload: activities.data });
  } catch {
    console.log("get all error");
  }
}
function* fetchActivitiesSaga() {
  yield takeEvery("FETCH_ACTIVITIES", fetchActivities);
}
export default fetchActivitiesSaga;
