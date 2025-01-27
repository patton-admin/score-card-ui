import {
    GET_ALL_BUCKET_BY_USERID, GET_ALL_BUCKET_BY_USERID_SUCCESS,
    GET_ALL_BUCKET_BY_USERID_FAILURE
} from './action';


//view All Bucket by userId...
export const getAllBucketByUserId = (userId) => ({
    type: GET_ALL_BUCKET_BY_USERID,
    userId
});

export const getAllBucketByUserIdSuccess = (payload = {}) => ({
    type: GET_ALL_BUCKET_BY_USERID_SUCCESS,
    bucket: payload
});

export const getAllBucketByUserIdFailure = () => ({
    type: GET_ALL_BUCKET_BY_USERID_FAILURE
});
