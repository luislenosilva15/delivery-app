import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import TeamSaga from "./features/team/teamSaga";

export default function* rootSaga() {
  yield all([authSaga(), TeamSaga()]);
}
