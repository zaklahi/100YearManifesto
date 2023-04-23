import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* deleteActivity(action) {
  try {
    yield axios.delete(`/api/idealWeek/${action.payload}`);
    console.log("Delete:", action.payload);
    yield put({ type: "FETCH_ACTIVITIES" });
  } catch (error) {
    console.log("delete error", error);
  }
}

function* deleteActivitySaga() {
  yield takeEvery("DELETE_ACTIVITY", deleteActivity);
}

export default deleteActivitySaga;
