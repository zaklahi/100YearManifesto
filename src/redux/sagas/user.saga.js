import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// WORKER SAGA for PUT - introComplete TRUE
function* introCompleteTrue(action) {
  console.log('introComplete SAGA GO');
  try {
    yield axios.put(`/api/intro`);
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('SAGA ERROR setting introComplete to TRUE:', error);
  }
}

// WORKER SAGA for PUT - questionsComplete TRUE
function* questionsCompleteTrue(action) {
  console.log('questionsComplete SAGA GO');
  try {
    yield axios.put(`/api/questionscomplete`);
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('SAGA ERROR setting questionsComplete to TRUE:', error);
  }
}

// WORKER SAGA for PUT - prioritiesComplete TRUE
function* prioritiesCompleteTrue(action) {
  console.log('prioritiesComplete SAGA GO');
  try {
    yield axios.put(`/api/prioritiescomplete`);
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('SAGA ERROR setting prioritiesComplete to TRUE:', error);
  }
 }
 

// WORKER SAGA for PUT - setupComplete TRUE
function* setupCompleteTrue(action) {
  console.log('setupComplete SAGA GO');
  try {
    yield axios.put(`/api/setupcomplete`);
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('SAGA ERROR setting setupComplete to TRUE:', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('INTRO_PAGE_DONE', introCompleteTrue);
  yield takeLatest('QUESTIONS_PAGE_DONE', questionsCompleteTrue);
  yield takeLatest('PRIORITIES_PAGE_DONE', prioritiesCompleteTrue);
  yield takeLatest('SETUP_COMPLETE', setupCompleteTrue);
}

export default userSaga;
