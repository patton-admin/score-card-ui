import { call, put, takeLatest } from "redux-saga/effects";
import {
  addBucketFailure,
  addBucketSuccess,
  viewBucketFailure,
  viewBucketSuccess,
  editBucketSuccess,
  editBucketFailure,
  deleteBucketSuccess,
  deleteBucketFailure,
} from "../actions/bucket";
import {
  getAllBucketByUserId,
  getAllBucketByUserIdSuccess,
  getAllBucketByUserIdFailure,
} from "../actions/user-bucket";
import { history } from "../routers/AppRouters";
import {
  ADD_BUCKET,
  GET_ALL_BUCKET,
  EDIT_BUCKET,
  DELETE_BUCKET,
} from "./../actions/action";
import { openModal } from "../actions/util";
import {
  addBucketApi,
  getAllBuckets,
  updateBucketApi,
  deleteBucketApi,
} from "./../api/api";

export function* getAllBucketEffect() {
  try {
    const { status, data } = yield call(getAllBuckets, { method: "get" });
    if (status === 200 && data !== undefined) {
      yield put(viewBucketSuccess(data));
    } else {
      yield put(viewBucketFailure());
    }
  } catch {
    yield put(viewBucketFailure());
  }
}

export function* getAllBucketWatcher() {
  yield takeLatest(GET_ALL_BUCKET, getAllBucketEffect);
}

//get all buckets
export function* updateBucket(bucketData) {
  const { bucket } = bucketData;
  try {
    let data = yield call(updateBucketApi, bucket);
    yield put(editBucketSuccess(data));
    history.push("/home");
  } catch {
    yield put(viewBucketFailure());
  }
}

export function* updateBucketWatcher() {
  yield takeLatest(EDIT_BUCKET, updateBucket);
}

//add new Bucket...
export function* addBucketEffect(bucketData) {
  let { bucket } = bucketData;
  try {
    const { status, data } = yield call(addBucketApi, bucket);
    if (status === 200 && data !== undefined) {
      yield put(addBucketSuccess(data));
      yield put(openModal({ initialVal: {}, isOpen: false }));
    } else {
      yield put(
        addBucketFailure(
          data.message === null ? "Unknown-Error Ocurred..." : data.message
        )
      );
    }
  } catch (e) {
    yield put(addBucketFailure());
  }
}

export function* addBucketWatcher() {
  yield takeLatest(ADD_BUCKET, addBucketEffect);
}

export function* deleteBucketEffect(id) {
  const { bucketId } = id;
  console.log("id... for deleting the lead...", bucketId);
  try {
    const { status, data } = yield call(deleteBucketApi, bucketId);
    if (status === 200 && data !== undefined) {
      yield put(deleteBucketSuccess(bucketId));
    } else {
      yield put(deleteBucketFailure(data));
    }
  } catch (e) {
    yield put(deleteBucketFailure());
  }
}

export function* deleteBucketWatcher() {
  yield takeLatest("DELETE_BUCKET", deleteBucketEffect);
}
