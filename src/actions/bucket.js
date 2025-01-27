import {
  GET_ALL_BUCKET,
  GET_ALL_BUCKET_SUCCESS,
  GET_ALL_BUCKET_FAILURE,
  ADD_BUCKET,
  ADD_BUCKET_SUCCESS,
  ADD_BUCKET_FAILURE,
  EDIT_BUCKET,
  EDIT_BUCKET_SUCCESS,
  EDIT_BUCKET_FAILURE,
  GET_ALL_USER_BUCKET,
  GET_ALL_USER_BUCKET_SUCCESS,
  GET_ALL_USER_BUCKET_ERROR,
  UPDATE_BUCKET_MESSAGE,
  DELETE_BUCKET,
  DELETE_BUCKET_SUCCESS,
  DELETE_BUCKET_FAILURE,
} from "./action";

//view All Bucket...
export const viewBucket = (payload = {}) => ({
  type: GET_ALL_BUCKET,
  bucket: payload,
});
export const viewBucketSuccess = (payload = {}) => ({
  type: GET_ALL_BUCKET_SUCCESS,
  bucket: payload,
});
export const viewBucketFailure = (payload = {}) => ({
  type: GET_ALL_BUCKET_FAILURE,
  message: payload,
});

//Add Bucket...
export const addBucket = (payload = {}) => ({
  type: ADD_BUCKET,
  bucket: payload,
});

export const addBucketSuccess = (payload = {}) => ({
  type: ADD_BUCKET_SUCCESS,
  bucket: payload,
});

export const addBucketFailure = (payload = {}) => ({
  type: ADD_BUCKET_FAILURE,
  message: payload,
});

//Edit Bucket...
export const editBucket = (payload = {}) => ({
  type: EDIT_BUCKET,
  bucket: payload,
});
export const editBucketSuccess = (payload = {}) => ({
  type: EDIT_BUCKET_SUCCESS,
  bucket: payload,
});
export const editBucketFailure = (payload = {}) => ({
  type: EDIT_BUCKET_FAILURE,
});

export const updateBucketMessage = () => ({
  type: UPDATE_BUCKET_MESSAGE,
  message: "",
});

//view All UserBucket...
export const viewUserBucket = (payload = {}) => ({
  type: GET_ALL_USER_BUCKET,
  bucket: payload,
});
export const viewUserBucketSuccess = (payload = {}) => ({
  type: GET_ALL_USER_BUCKET_SUCCESS,
  bucket: payload,
});
export const viewUserBucketFailure = (payload = {}) => ({
  type: GET_ALL_USER_BUCKET_ERROR,
  message: payload,
});

export const deleteBucket = ({ bucketId } = {}) => ({
  type: DELETE_BUCKET,
  bucketId,
});

export const deleteBucketSuccess = (payload = {}) => ({
  type: DELETE_BUCKET_SUCCESS,
  bucketId: payload,
});
export const deleteBucketFailure = (payload = {}) => ({
  type: DELETE_BUCKET_FAILURE,
  bucket: payload,
});
