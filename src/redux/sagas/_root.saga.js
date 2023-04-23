import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import questionsSaga from "./fetchQuestions.saga";
import newActivitySaga from "./newActivity.saga";
import fetchActivitiesSaga from "./fetchActivities.saga";
import categoriesSaga from "./fetchCategories.saga";
import userListSaga from "./userlist.saga";
import answerSagas from "./answer.saga";
import editActivitySaga from "./editActivity.saga";
import deleteActivitySaga from "./deleteActivity.saga";
import prioritiesSaga from "./priorities.saga";
import editQuestionsSaga from "./editQuestions.saga";

prioritiesSaga;

export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    questionsSaga(),
    newActivitySaga(),
    fetchActivitiesSaga(),
    categoriesSaga(),
    userListSaga(),
    answerSagas(),
    editActivitySaga(),
    deleteActivitySaga(),
    prioritiesSaga(),
    editQuestionsSaga(),
  ]);
}
