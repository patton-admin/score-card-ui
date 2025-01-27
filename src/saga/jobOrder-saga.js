import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllJobSuccess,
  getAllJobFailure,
  addJobSuccess,
  addJobFailure,
  updateJobSuccess,
  updateJobFailure,
  deleteJobSuccess,
  deleteJobFailure,
} from "../actions/job";
import { ADD_JOB, UPDATE_JOB, GET_ALL_JOB } from "./../actions/action";
import {
  getAllJobOrders,
  addJobOrderApi,
  updateJobOrderApi,
  deleteJobApi,
} from "../api/api";
import { openModal } from "../actions/util";
import { history } from "../routers/AppRouters";

//saga to get all Job
export function* getAllJobOrderEffect() {
  try {
    const { status, data } = yield call(getAllJobOrders, { method: "get" });
    if (status === 200 && data !== undefined) {
      yield put(getAllJobSuccess(data));
    } else {
      yield put(getAllJobFailure());
    }
  } catch (e) {
    yield put(getAllJobFailure());
  }
}

export function* getAllJobOrderWatcher() {
  yield takeLatest(GET_ALL_JOB, getAllJobOrderEffect);
}

//to add a new Job...
export function* addJobOrderEffect(jobOrderAction) {
  let { jobOrder } = jobOrderAction;
  try {
    let { status, data } = yield call(addJobOrderApi, jobOrder);
    if (status === 200 && data !== undefined) {
      yield put(addJobSuccess(data));
      yield put(openModal({ initialVal: {}, isOpen: false }));
    } else {
      yield put(
        addJobFailure(
          data.message === null ? "Unknown-Error Ocurred..." : data.message
        )
      );
    }
  } catch (e) {
    yield put(addJobFailure());
  }
}

//sage function that is initiated in the begining
export function* addJobOrderWatcher() {
  yield takeLatest(ADD_JOB, addJobOrderEffect);
}

//to update new job...
export function* updateJobOrderEffect(jobOrderAction) {
  let { jobOrder } = jobOrderAction;
  try {
    let { status, data } = yield call(updateJobOrderApi, jobOrder);
    if (status === 200 && data !== undefined) {
      yield put(updateJobSuccess(data));
      yield put(openModal({ initialVal: {}, isOpen: false }));
    } else {
      yield put(updateJobFailure());
    }
  } catch (e) {
    yield put(updateJobFailure());
  }
}

//sage function that is initiated in the begining
export function* updateJobOrderWatcher() {
  yield takeLatest(UPDATE_JOB, updateJobOrderEffect);
}

export function* deleteJobEffect(id) {
  const { jobId } = id;
  console.log("id... for deleting the jobOrder...", jobId);
  try {
    const { status, data } = yield call(deleteJobApi, jobId);
    if (status === 200 && data !== undefined) {
      yield put(deleteJobSuccess(jobId));
    } else {
      yield put(deleteJobFailure(data));
    }
  } catch (e) {
    yield put(deleteJobFailure());
  }
}

export function* deleteJobWatcher() {
  yield takeLatest("DELETE_JOB", deleteJobEffect);
}
