import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import TeamSaga from "./features/team/teamSaga";
import MenuSaga from "./features/menu/menuSaga";
import clientSaga from "./features/client/clientSaga";

export default function* rootSaga() {
  yield all([authSaga(), TeamSaga(), MenuSaga(), clientSaga()]);
}
