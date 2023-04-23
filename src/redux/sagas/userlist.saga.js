import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchUserList() {
  try {
    const userList = yield axios.get('/api/userlist');
    console.log('get USERLIST result:', userList.data);
    yield put({ type: 'SET_USERLIST', payload: userList.data });
  } catch (error) {
    console.log('ERROR GETTING USER LIST:', error);
  }
}

function* userListSaga() {
  yield takeLatest('FETCH_USERLIST', fetchUserList);
}

export default userListSaga;
