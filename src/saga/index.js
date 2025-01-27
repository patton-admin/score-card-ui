import { all } from "redux-saga/effects";
import {
  addCandidateWatcher,
  getAllCandidateWatcher,
  deleteCandidateWatcher,
} from "./candidate-saga";
import { loginActionWatcher } from "./login-saga";
import {
  addUserActionWatcher,
  getUserActionWatcher,
  deleteUserWatcher,
} from "./user-saga";
import {
  getAllJobOrderWatcher,
  addJobOrderWatcher,
  updateJobOrderWatcher,
  deleteJobWatcher,
} from "./jobOrder-saga";
import {
  getAllBucketWatcher,
  addBucketWatcher,
  updateBucketWatcher,
  deleteBucketWatcher,
} from "./bucket-saga";
import {
  addClientWatcher,
  getAllClientWatcher,
  updateClientWatcher,
  deleteClientWatcher,
} from "./client-saga";
import { addLovWatcher, getAllLovWatcher, deleteLovWatcher } from "./util-saga";
// import { addTodoWatcher, getAllTodoWatcher } from "./todo-saga";
import { getDashboardWatcher, getLeadDashboardWatcher } from "./dashboard-saga";

export default function* rootSaga() {
  yield all([
    loginActionWatcher(),
    getUserActionWatcher(),
    addUserActionWatcher(),
    deleteUserWatcher(),
    getAllCandidateWatcher(),
    addCandidateWatcher(),
    deleteCandidateWatcher(),
    getAllJobOrderWatcher(),
    addJobOrderWatcher(),
    updateJobOrderWatcher(),
    deleteJobWatcher(),
    getAllBucketWatcher(),
    addBucketWatcher(),
    updateBucketWatcher(),
    deleteBucketWatcher(),
    addClientWatcher(),
    getAllClientWatcher(),
    updateClientWatcher(),
    deleteClientWatcher(),
    // addTodoWatcher(),
    // getAllTodoWatcher(),
    getDashboardWatcher(),
    getLeadDashboardWatcher(),

    getAllLovWatcher(),
    addLovWatcher(),
    deleteLovWatcher(),
    // logoutActionWatcher(),
    // fetchSelfActionWatcher()
  ]);
}
