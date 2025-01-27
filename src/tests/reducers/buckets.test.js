import { bucketReducer } from "../../reducers/buckets";
import bucketData from "./../fixtures/bucketsFixtures";

describe(`buckets functionality`, () => {
  test(`Should setup the default values for the Bucket...`, () => {
    const state = bucketReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      bktLoading: false,
      bktError: false,
      buckets: [],
    });
  });

  //before adding the candidate setting the loading to true...
  test(`Should change the state of loading to true before adding new bucket...`, () => {
    const bucket = {};
    const action = { type: "ADD_BUCKET", bucket };
    const state = bucketReducer(undefined, action);
    expect(state).toEqual({
      bktLoading: true,
      bktError: false,
      buckets: [],
    });
  });

  // after success, updating the state with new data and setting the loading to false...
  test(`Should update the state with new bucket...`, () => {
    const bucket = {
      bucketid: 100,
      bucketOwner: "Breme",
      bucketName: "BremeBucket",
      bucketDesc: "Breme's Team Bucket",
      bucketDetailedDesc: "Description New",
      pryemail: null,
      assignedUsers: "4,3",
      createdAt: "2020-05-13T17:29:27.000Z",
      updatedAt: "2020-05-18T12:34:31.000Z",
    };
    const initialValue = {
      bktLoading: false,
      bktError: false,
      buckets: bucketData,
    };
    const action = { type: "ADD_BUCKET_SUCCESS", bucket };
    const state = bucketReducer(initialValue, action);
    expect(state).toEqual({
      bktLoading: false,
      bktError: false,
      buckets: [...bucketData, bucket],
    });
  });

  //getting user from the api...
  test(`Before getting all the buckets will set the loading to true...`, () => {
    const action = { type: "GET_ALL_BUCKET" };
    const state = bucketReducer(undefined, action);
    expect(state).toEqual({
      bktLoading: true,
      bktError: false,
      buckets: [],
    });
  });

  test(`after getting all the buckets will set the candidate with data...`, () => {
    const bucket = {};
    bucket.data = bucketData;
    const action = { type: "GET_ALL_BUCKET_SUCCESS", bucket };
    const state = bucketReducer(undefined, action);
    expect(state).toEqual({
      bktLoading: false,
      bktError: false,
      buckets: bucketData,
    });
  });

  test(`getting all the buckets failed will set the buckets with data [] and error -> true...`, () => {
    const action = { type: "GET_ALL_BUCKET_FAILURE" };
    const state = bucketReducer(undefined, action);
    expect(state).toEqual({
      bktLoading: false,
      bktError: true,
      buckets: [],
    });
  });
});
