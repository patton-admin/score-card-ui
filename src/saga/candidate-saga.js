import { call, put, takeLatest } from "redux-saga/effects";
import {
  addCandidateFailure,
  addCandidateSuccess,
  viewCandidateFailure,
  viewCandidateSuccess,
  deleteCandidateSuccess,
  deleteCandidateFailure,
} from "../actions/candidate";
import { openModal } from "../actions/util";
import {
  addCandidateApi,
  getAllCandidates,
  deleteCandidateApi,
} from "../api/api";
import { DELETE_CANDIDATE } from "../actions/action";

export function* getAllCandidateEffect() {
  try {
    const { status, data } = yield call(getAllCandidates, { method: "get" });
    if (status === 200 && data !== undefined && data.data) {
      yield put(viewCandidateSuccess(data.data));
    } else {
      yield put(viewCandidateFailure());
    }
  } catch {
    yield put(viewCandidateFailure());
  }
}

export function* getAllCandidateWatcher() {
  yield takeLatest("VIEW_ALL_CANDIDATES", getAllCandidateEffect);
}

//to add a new candidate...
export function* addCandidateEffect(candidateData) {
  let { candidate } = candidateData;
  try {
    const { status, data } = yield call(addCandidateApi, {...candidate, type: "post"});
    if (status === 200 && data !== undefined) {
      yield put(addCandidateSuccess(data));
      yield put(openModal({ initialVal: {}, isOpen: false }));
    } else {
      yield put(
        addCandidateFailure(
          data.message === null ? "Unknown-Error Ocurred..." : data.message
        )
      );
    }
  } catch {
    yield put(addCandidateFailure());
  }
}

// const genObject = getAllCandidateEffect({});
// console.log("1st call", genObject.next());
// console.log("2nst call", genObject.next());
// console.log("3rd call", genObject.next());

export function* addCandidateWatcher() {
  yield takeLatest("ADD_CANDIDATE", addCandidateEffect);
}

export function* deleteCandidateEffect(id) {
  const { candidateId } = id;
  console.log("id... for deleting the lead...", candidateId);
  try {
    const { status, data } = yield call(deleteCandidateApi, candidateId);
    if (status === 200 && data !== undefined) {
      yield put(deleteCandidateSuccess(candidateId));
    } else {
      yield put(deleteCandidateFailure(data));
    }
  } catch (e) {
    yield put(deleteCandidateFailure());
  }
}

export function* deleteCandidateWatcher() {
  yield takeLatest("DELETE_CANDIDATE", deleteCandidateEffect);
}
