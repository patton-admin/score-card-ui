import { call, put, takeLatest } from "redux-saga/effects";
import {
  addLov,
  addLovFailure,
  addLovSuccess,
  viewLovSuccess,
  viewLovFailure,
  deleteLov,
  deleteLovSuccess,
  deleteLovError,
} from "../actions/util";
import { openModal } from "../actions/util";
import { getAllLov, addLovApi, deleteLovApi } from "../api/api";

export function* getAllLovEffect() {
  try {
    const { status, data } = yield call(getAllLov, { method: "get" });
    if (status === 200 && data !== undefined) {
      yield put(viewLovSuccess(data));
    } else {
      yield put(
        viewLovFailure(
          data.message === null ? "Unknown-Error Ocurred..." : data.message
        )
      );
    }
  } catch {
    yield put(viewLovFailure());
  }
}

export function* getAllLovWatcher() {
  yield takeLatest("GET_ALL_LOV", getAllLovEffect);
}

//to add a new LOV...
export function* addLovEffect(lovData) {
  let { lov } = lovData;
  try {
    const { status, data } = yield call(addLovApi, lov);
    if (status === 200 && data !== undefined) {
      yield put(addLovSuccess(data));
      yield put(openModal({ initialVal: {}, isOpen: false }));
    } else {
      yield put(addLovFailure(data.message));
    }
  } catch {
    yield put(addLovFailure());
  }
}

export function* addLovWatcher() {
  yield takeLatest("ADD_LOV", addLovEffect);
}

export function* deleteLovEffect(id) {
  const { lovId } = id;
  try {
    const { status, data } = yield call(deleteLovApi, lovId);
    if (status === 200) {
      yield put(deleteLovSuccess(lovId));
    } else {
      yield put(deleteLovError(data));
    }
  } catch (e) {
    console.log("e");
    yield put(deleteLovError());
  }
}

export function* deleteLovWatcher() {
  yield takeLatest("DELETE_LOV", deleteLovEffect);
}
