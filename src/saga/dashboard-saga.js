import { call, put, takeLatest } from "redux-saga/effects";
import { GET_DASHBOARD_DATA } from "../actions/action";
import {
  getDashboardDataSuccess,
  getDashboardDataError,
  getLeadDashboardDataSuccess,
  getLeadDashboardDataError,
} from "../actions/dashboard";
import { openModal } from "../actions/util";
import { getDashBoardApi, getLeadDashBoardApi } from "../api/api";

//getDashboard data...
export function* getDashboardEffect(dashboardData) {
  let { dashboard } = dashboardData;
  try {
    const { status, data } = yield call(getDashBoardApi, dashboard);
    if (status === 200 && data !== undefined) {
      yield put(getDashboardDataSuccess(data));
    } else {
      yield put(getDashboardDataError());
    }
  } catch (e) {
    yield put(getDashboardDataError());
  }
}

export function* getDashboardWatcher() {
  yield takeLatest("GET_DASHBOARD_DATA", getDashboardEffect);
}

//getDashboard data...
export function* getLeadDashboardEffect(dashboardData) {
  let { dashboardLead } = dashboardData;
  try {
    const { status, data } = yield call(getLeadDashBoardApi, dashboardLead);
    if (status === 200 && data !== undefined) {
      yield put(getLeadDashboardDataSuccess(data));
    } else {
      yield put(getLeadDashboardDataError());
    }
  } catch (e) {
    yield put(getLeadDashboardDataError());
  }
}

export function* getLeadDashboardWatcher() {
  yield takeLatest("GET_LEAD_DASHBOARD_DATA", getLeadDashboardEffect);
}
