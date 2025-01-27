import {
  GET_ALL_JOB,
  GET_ALL_JOB_SUCCESS,
  GET_ALL_JOB_FAILURE,
  ADD_JOB,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILURE,
  UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_MESSAGE,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
} from "./action";

//get All Joborders...
export const getAllJob = (payload = {}) => ({
  type: GET_ALL_JOB,
  jobOrder: payload,
});

//get All JobOrder Success...
export const getAllJobSuccess = (payload = {}) => ({
  type: GET_ALL_JOB_SUCCESS,
  jobOrder: payload !== {} && payload !== "" ? payload : [],
});

//get All Job Order Failure...
export const getAllJobFailure = () => ({
  type: GET_ALL_JOB_FAILURE,
});

//add job orders...
export const addJob = (payload = {}) => ({
  type: ADD_JOB,
  jobOrder: payload,
});

//add job orders success...
export const addJobSuccess = (payload = {}) => ({
  type: ADD_JOB_SUCCESS,
  jobOrder: payload,
});

//add job orders failure...
export const addJobFailure = () => ({
  type: ADD_JOB_FAILURE,
});

//update job orders...
export const updateJob = (payload = {}) => ({
  type: UPDATE_JOB,
  jobOrder: payload,
});

export const updateJobSuccess = (payload = {}) => ({
  type: UPDATE_JOB_SUCCESS,
  jobOrder: payload,
});

export const updateJobFailure = () => ({
  type: UPDATE_JOB_FAILURE,
});

export const updateJobMessage = () => ({
  type: UPDATE_JOB_MESSAGE,
  message: "",
});

export const deleteJob = ({ jobId } = {}) => ({
  type: DELETE_JOB,
  jobId,
});

export const deleteJobSuccess = (payload = {}) => ({
  type: DELETE_JOB_SUCCESS,
  jobId: payload,
});

export const deleteJobFailure = (payload = {}) => ({
  type: DELETE_JOB_FAILURE,
  jobId: payload,
});
