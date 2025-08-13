import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import TeamSaga from "./features/team/teamSaga";
import MenuSaga from "./features/menu/menuSaga";

export default function* rootSaga() {
  yield all([authSaga(), TeamSaga(), MenuSaga()]);
}
