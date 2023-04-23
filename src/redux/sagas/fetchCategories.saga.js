import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";


function* fetchCategories() {
 try {
   const categories = yield axios.get("/api/category");
   console.log("get all categories:", categories.data);
   yield put({ type: "SET_CATEGORIES", payload: categories.data });
 } catch {
   console.log("get all categories error");
 }
}
function* categoriesSaga() {
 yield takeEvery("FETCH_CATEGORIES", fetchCategories);
}
export default categoriesSaga;