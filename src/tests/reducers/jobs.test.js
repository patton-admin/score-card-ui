import { jobOrderReducer } from "../../reducers/jobs";
import jobsData from "./../fixtures/jobsFixtures";

describe(`Jobs functionality`, () => {
  test(`Should setup the default values for the jobs...`, () => {
    const state = jobOrderReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      jobLoading: false,
      jobError: false,
      jobOrders: [],
    });
  });

  //before adding the jobs setting the loading to true...
  test(`Should change the state of loading to true before adding new bucket...`, () => {
    const job = {};
    const action = { type: "ADD_JOB", job };
    const state = jobOrderReducer(undefined, action);
    expect(state).toEqual({
      jobLoading: true,
      jobError: false,
      jobOrders: [],
    });
  });

  // after success, updating the state with new data and setting the loading to false...
  test(`Should update the state with new jobOrder...`, () => {
    const jobOrder = {
      jobid: "112",
      jobTitle: "Hot Orders",
      jobType: "Hot Orders",
      state: "MI",
      city: "SouthField",
      zipcode: null,
      clientName: "",
      vendorName: "",
      deadline: "",
      accountManager: null,
      jobstatus: null,
      priority: "1",
      noofpositions: null,
      totalSubmissions: 1,
      yearOfExp: null,
      rate: 111,
      createdAt: "2020-05-11T12:54:24.000Z",
      updatedAt: "2020-05-11T12:54:24.000Z",
    };

    const initialValue = {
      jobLoading: false,
      jobError: false,
      jobOrders: jobsData,
    };

    const action = { type: "ADD_JOB_SUCCESS", jobOrder };
    const state = jobOrderReducer(initialValue, action);
    expect(state).toEqual({
      jobLoading: false,
      jobError: false,
      jobOrders: [...jobsData, jobOrder],
    });
  });

  // getting user from the api...
  test(`Before getting all the jobOrders will set the loading to true...`, () => {
    const action = { type: "GET_ALL_JOB" };
    const state = jobOrderReducer(undefined, action);
    expect(state).toEqual({
      jobLoading: true,
      jobError: false,
      jobOrders: [],
    });
  });

  test(`after getting all the jobOrders will set the candidate with data...`, () => {
    const jobOrder = jobsData;
    const action = { type: "GET_ALL_JOB_SUCCESS", jobOrder };
    const state = jobOrderReducer(undefined, action);
    expect(state).toEqual({
      jobLoading: false,
      jobError: false,
      jobOrders: jobsData,
    });
  });

  test(`getting all the jobOrders failed will set the jobOrders with data [] and error -> true...`, () => {
    const action = { type: "GET_ALL_JOB_FAILURE" };
    const state = jobOrderReducer(undefined, action);
    expect(state).toEqual({
      jobLoading: false,
      jobError: true,
      jobOrders: [],
    });
  });
});
