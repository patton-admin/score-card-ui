/****
 * Actions items for Candidate...
 */
import {
  VIEW_ALL_CANDIDATES,
  VIEW_ALL_CANDIDATES_SUCCESS,
  VIEW_ALL_CANDIDATES_FAILURE,
  ADD_CANDIDATE,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_FAILURE,
  UPDATE_CANDIDATE_MESSAGE,
} from "./action";

//view All Candidate...
export const viewCandidate = (payload = {}) => ({
  type: VIEW_ALL_CANDIDATES,
  candidate: payload,
});
export const viewCandidateSuccess = (payload = {}) => ({
  type: VIEW_ALL_CANDIDATES_SUCCESS,
  candidate: payload,
});
export const viewCandidateFailure = () => ({
  type: VIEW_ALL_CANDIDATES_FAILURE,
});

//Add Candidate...
export const addCandidate = (payload = {}) => ({
  type: ADD_CANDIDATE,
  candidate: payload,
});

export const addCandidateSuccess = (payload = {}) => ({
  type: ADD_CANDIDATE_SUCCESS,
  candidate: payload,
});

export const addCandidateFailure = (payload = {}) => ({
  type: ADD_CANDIDATE_FAILURE,
  message: payload,
});

export const updateCandidateMessage = () => ({
  type: UPDATE_CANDIDATE_MESSAGE,
  message: "",
});

//Edit Candidate...
export const editCandidate = (payload = {}) => ({
  type: "EDIT_CANDIDATE",
  candidate: payload,
});

export const deleteCandidate = ({ candidateId } = {}) => ({
  type: DELETE_CANDIDATE,
  candidateId,
});

export const deleteCandidateSuccess = (payload = {}) => ({
  type: DELETE_CANDIDATE_SUCCESS,
  candidateId: payload,
});
export const deleteCandidateFailure = (payload = {}) => ({
  type: DELETE_CANDIDATE_FAILURE,
  candidate: payload,
});
