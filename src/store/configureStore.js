import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { candidateReducer } from "./../reducers/candidates";
import { jobOrderReducer } from "./../reducers/jobs";
import { userReducer } from "./../reducers/users";
import { loginReducer } from "./../reducers/loginlogout";
import { utilReducer } from "./../reducers/utils";
import { bucketReducer } from "./../reducers/buckets";
import rootSaga from "./../saga/index";
import { clientReducer } from "../reducers/clients";
import { dashboardReducer } from "../reducers/dashboards";
import { todoReducer } from "../reducers/todos";

let composeEnhancers = compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = [applyMiddleware(...middleware)];

if (process.env.NODE_ENV !== "production" && typeof window === "object") {
  /* eslint-disable no-underscore-dangle */
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

  // NOTE: Uncomment the code below to restore support for Redux Saga
  // Dev Tools once it supports redux-saga version 1.x.x
  // if (window.__SAGA_MONITOR_EXTENSION__)
  //   reduxSagaMonitorOptions = {
  //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
  //   };
  /* eslint-enable */
}

export default () => {
  const appReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
    jobOrder: jobOrderReducer,
    candidate: candidateReducer,
    bucket: bucketReducer,
    client: clientReducer,
    dashboard: dashboardReducer,
    todo: todoReducer,
    util: utilReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "LOGOUT_REQUEST") {
      state = undefined;
    }
    return appReducer(state, action);
  };

  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);

  return store;
};
