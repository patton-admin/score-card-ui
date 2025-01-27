/****
 * candidate...
 */
import {
  ADD_BUCKET,
  ADD_BUCKET_SUCCESS,
  ADD_BUCKET_FAILURE,
  GET_ALL_BUCKET,
  GET_ALL_BUCKET_SUCCESS,
  GET_ALL_BUCKET_FAILURE,
  GET_ALL_BUCKET_BY_USERID,
  GET_ALL_BUCKET_BY_USERID_SUCCESS,
  GET_ALL_BUCKET_BY_USERID_FAILURE,
  EDIT_BUCKET,
  EDIT_BUCKET_SUCCESS,
  EDIT_BUCKET_FAILURE,
  DELETE_BUCKET,
  DELETE_BUCKET_SUCCESS,
  DELETE_BUCKET_FAILURE,
  UPDATE_BUCKET_MESSAGE,
} from "./../actions/action";

const bucket = {
  bucketName: "",
  bucketOwner: "",
  bktShrtDesc: "",
  bktLngDesc: "",
  bktOwnerId: "",
  assignedUsers: [],
};

const initialStateValue = {
  bktLoading: false,
  bktError: false,
  message: "",
  buckets: [],
};

export const bucketReducer = (state = initialStateValue, action) => {
  //   console.log("actions from buckets", action);
  switch (action.type) {
    //get operations
    case GET_ALL_BUCKET:
      return { ...state, bktLoading: true, bktError: false };
    case GET_ALL_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: action.bucket,
        bktLoading: false,
        bktError: false,
      };
    case GET_ALL_BUCKET_FAILURE:
      return { ...state, bktLoading: false, bktError: true };

    case GET_ALL_BUCKET_BY_USERID:
      return { ...state, bktLoading: true, bktError: false };
    case GET_ALL_BUCKET_BY_USERID_SUCCESS:
      return {
        ...state,
        buckets: action.bucket.data,
        bktLoading: false,
        bktError: false,
      };
    case GET_ALL_BUCKET_BY_USERID_FAILURE:
      return { ...state, bktLoading: false, bktError: true };

    //add Operation
    case ADD_BUCKET:
      return { ...state, bktLoading: true, bktError: false };
    case ADD_BUCKET_SUCCESS:
      // console.log("value of bucket...", { ...state });
      let { id } = action.bucket;
      let data = state.buckets.filter((e) => e.id !== id);
      data = [...data, action.bucket];
      return {
        ...state,
        buckets: data,
        bktLoading: false,
        bktError: false,
      };
    case ADD_BUCKET_FAILURE:
      return {
        ...state,
        bktLoading: false,
        bktError: true,
        message: action.message,
      };

    //edit operation
    case EDIT_BUCKET:
      return { ...state, bktLoading: true, bktError: false };
    case EDIT_BUCKET_SUCCESS:
      return {
        ...state,
        buckets: [...state.buckets, action.bucket],
        bktLoading: false,
        bktError: false,
      };
    case EDIT_BUCKET_FAILURE:
      return { ...state, bktLoading: false, bktError: true };

    case DELETE_BUCKET:
      return { ...state, bktLoading: true, bktError: false };

    case DELETE_BUCKET_SUCCESS:
      let x = state.buckets.filter(
        (bkt) => !action.bucketId.join("").includes(bkt.id)
      );
      return {
        ...state,
        buckets: x,
        bktLoading: false,
        bktError: true,
        message: action.message,
      };
    case DELETE_BUCKET_FAILURE:
      return { ...state, bktLoading: false, bktError: true };

    //update bucket message
    case UPDATE_BUCKET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
