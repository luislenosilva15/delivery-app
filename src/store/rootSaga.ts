import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import TeamSaga from "./features/team/teamSaga";
import MenuSaga from "./features/menu/menuSaga";
import clientSaga from "./features/client/clientSaga";
import OrderManagerSaga from "./features/orderManager/orderManagerSaga";
import statisticsSaga from "./features/statistics/statisticsSaga";
import salesSaga from "./features/sales/salesSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    TeamSaga(),
    MenuSaga(),
    clientSaga(),
    OrderManagerSaga(),
    statisticsSaga(),
    salesSaga(),
  ]);
}
