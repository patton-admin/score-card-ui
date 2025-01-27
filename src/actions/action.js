//Login Actions
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";

export const IS_VALID_LOGIN = "IS_VALID_LOGIN";
export const IS_VALID_LOGIN_SUCCESS = "IS_VALID_LOGIN_SUCCESS";
export const IS_VALID_LOGIN_ERROR = "IS_VALID_LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

//User Actions
export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_ERROR = "ADD_USER_ERROR";

export const GET_ALL_USER = "GET_ALL_USER";
export const GET_ALL_USER_SUCCESS = "GET_ALL_USER_SUCCESS";
export const GET_ALL_USER_FAILURE = "GET_ALL_USER_FAILURE";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const UPDATE_USER_MESSAGE = "UPDATE_USER_MESSAGE";

//Job Actions
//add Job Orders...
export const GET_ALL_JOB = "GET_ALL_JOB";
export const GET_ALL_JOB_SUCCESS = "GET_ALL_JOB_SUCCESS";
export const GET_ALL_JOB_FAILURE = "GET_ALL_JOB_FAILURE";

export const ADD_JOB = "ADD_JOB";
export const ADD_JOB_SUCCESS = "ADD_JOB_SUCCESS";
export const ADD_JOB_FAILURE = "ADD_JOB_FAILURE";

export const UPDATE_JOB = "UPDATE_JOB";
export const UPDATE_JOB_SUCCESS = "UPDATE_JOB_SUCCESS";
export const UPDATE_JOB_FAILURE = "UPDATE_JOB_FAILURE";

export const DELETE_JOB = "DELETE_JOB";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const DELETE_JOB_FAILURE = "DELETE_JOB_FAILURE";

export const UPDATE_JOB_MESSAGE = "UPDATE_JOB_MESSAGE";

//Candidates
export const VIEW_ALL_CANDIDATES = "VIEW_ALL_CANDIDATES";
export const VIEW_ALL_CANDIDATES_SUCCESS = "VIEW_ALL_CANDIDATES_SUCCESS";
export const VIEW_ALL_CANDIDATES_FAILURE = "VIEW_ALL_CANDIDATES_FAILURE";

//Add Candidates
export const ADD_CANDIDATE = "ADD_CANDIDATE";
export const ADD_CANDIDATE_SUCCESS = "ADD_CANDIDATE_SUCCESS";
export const ADD_CANDIDATE_FAILURE = "ADD_CANDIDATE_FAILURE";

export const UPDATE_CANDIDATE_MESSAGE = "UPDATE_CANDIDATE_MESSAGE";

//delete Candidates
export const DELETE_CANDIDATE = "DELETE_CANDIDATE";
export const DELETE_CANDIDATE_SUCCESS = "DELETE_CANDIDATE_SUCCESS";
export const DELETE_CANDIDATE_FAILURE = "DELETE_CANDIDATE_FAILURE";

//Bucket Actions
//add Bucket Orders...
export const GET_ALL_BUCKET = "GET_ALL_BUCKET";
export const GET_ALL_BUCKET_SUCCESS = "GET_ALL_BUCKET_SUCCESS";
export const GET_ALL_BUCKET_FAILURE = "GET_ALL_BUCKET_FAILURE";

export const ADD_BUCKET = "ADD_BUCKET";
export const ADD_BUCKET_SUCCESS = "ADD_BUCKET_SUCCESS";
export const ADD_BUCKET_FAILURE = "ADD_BUCKET_FAILURE";

export const DELETE_BUCKET = "DELETE_BUCKET";
export const DELETE_BUCKET_SUCCESS = "DELETE_BUCKET_SUCCESS";
export const DELETE_BUCKET_FAILURE = "DELETE_BUCKET_FAILURE";

// BUCKET_ucket functionality...
export const EDIT_BUCKET = "EDIT_BUCKET";
export const EDIT_BUCKET_SUCCESS = "EDIT_BUCKET_SUCCESS";
export const EDIT_BUCKET_FAILURE = "EDIT_BUCKET_FAILURE";

// Available users in a bucket...
export const GET_ALL_USER_BUCKET = "GET_ALL_USER_BUCKET";
export const GET_ALL_USER_BUCKET_SUCCESS = "GET_ALL_USER_BUCKET_SUCCESS";
export const GET_ALL_USER_BUCKET_ERROR = "GET_ALL_USER_BUCKET_ERROR";

//edit candidate functionality...
export const EDIT_CANDIDATE = "EDIT_CANDIDATE";
export const EDIT_CANDIDATE_SUCCESS = "EDIT_CANDIDATE_SUCCESS";
export const EDIT_CANDIDATE_FAILURE = "EDIT_CANDIDATE_FAILURE";

//getting all user by Bucket...
export const GET_ALL_BUCKET_BY_USERID = "GET_ALL_BUCKET_BY_USERID";
export const GET_ALL_BUCKET_BY_USERID_SUCCESS =
  "GET_ALL_BUCKET_BY_USERID_SUCCESS";
export const GET_ALL_BUCKET_BY_USERID_FAILURE =
  "GET_ALL_BUCKET_BY_USERID_FAILURE";

export const UPDATE_BUCKET_MESSAGE = "UPDATE_BUCKET_MESSAGE";

//client
export const ADD_CLIENT = "ADD_CLIENT";
export const ADD_CLIENT_SUCCESS = "ADD_CLIENT_SUCCESS";
export const ADD_CLIENT_ERROR = "ADD_CLIENT_ERROR";

export const GET_ALL_CLIENT = "GET_ALL_CLIENT";
export const GET_ALL_CLIENT_SUCCESS = "GET_ALL_CLIENT_SUCCESS";
export const GET_ALL_CLIENT_FAILURE = "GET_ALL_CLIENT_FAILURE";

export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const UPDATE_CLIENT_SUCCESS = "UPDATE_CLIENT_SUCCESS";
export const UPDATE_CLIENT_ERROR = "UPDATE_CLIENT_ERROR";

export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS";
export const DELETE_CLIENT_ERROR = "DELETE_CLIENT_ERROR";

export const UPDATE_CLIENT_MESSAGE = "UPDATE_CLIENT_MESSAGE";

//Dashboard
// Available users in a bucket...
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const GET_DASHBOARD_DATA_SUCCESS = "GET_DASHBOARD_DATA_SUCCESS";
export const GET_DASHBOARD_DATA_ERROR = "GET_DASHBOARD_DATA_ERROR";

export const GET_LEAD_DASHBOARD_DATA = "GET_LEAD_DASHBOARD_DATA";
export const GET_LEAD_DASHBOARD_DATA_SUCCESS =
  "GET__LEAD_DASHBOARD_DATA_SUCCESS";
export const GET_LEAD_DASHBOARD_DATA_ERROR = "GET_LEAD_DASHBOARD_DAsTA_ERROR";

//todo
export const GET_ALL_TODO = "GET_ALL_TODO";
export const GET_ALL_TODO_SUCCESS = "GET_ALL_TODO_SUCCESS";
export const GET_ALL_TODO_ERROR = "GET_ALL_TODO_ERROR";

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";

export const DELETE_TODO = "DELETE_TODO";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_ERROR = "DELETE_TODO_ERROR";

export const UPDATE_TODO_MESSAGE = "UPDATE_TODO_MESSAGE";

//Util
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_OPEN_SUCCESS = "MODAL_OPEN_SUCCESS";
export const MODAL_OPEN_FAILURE = "MODAL_OPEN_FAILURE";

export const MODAL_OPEN_BUCKET = "MODAL_OPEN_BUCKET";
export const MODAL_OPEN_BUCKET_SUCCESS = "MODAL_OPEN_BUCKET_SUCCESS";
export const MODAL_OPEN_BUCKET_FAILURE = "MODAL_OPEN_BUCKET_FAILURE";

//add Lovs
export const ADD_LOV = "ADD_LOV";
export const ADD_LOV_SUCCESS = "ADD_LOV_SUCCESS";
export const ADD_LOV_ERROR = "ADD_LOV_ERROR";

//Delete Lovs...
export const DELETE_LOV = "DELETE_LOV";
export const DELETE_LOV_SUCCESS = "DELETE_LOV_SUCCESS";
export const DELETE_LOV_ERROR = "DELETE_LOV_ERROR";

//get Lovs...
export const GET_ALL_LOV = "GET_ALL_LOV";
export const GET_ALL_LOV_SUCCESS = "GET_ALL_LOV_SUCCESS";
export const GET_ALL_LOV_ERROR = "GET_ALL_LOV_ERROR";
