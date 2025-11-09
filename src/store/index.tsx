import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import teamReducer from "./features/team/teamSlice";
import menuReducer from "./features/menu/menuSlice";
import ClientReducer from "./features/client/clientSlice";
import OrderManagerReducer from "./features/orderManager/orderManagerSlice";
import statisticsReducer from "./features/statistics/statisticsSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    menu: menuReducer,
    client: ClientReducer,
    orderManager: OrderManagerReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
