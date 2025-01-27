import { candidateReducer } from "../../reducers/candidates";
import candidateData from "./../fixtures/candidatesFixtures";

describe(`Candidates functionality`, () => {
  test(`Should setup the default values for the candidates...`, () => {
    const state = candidateReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      canLoading: false,
      canError: false,
      candidates: [],
    });
  });

  //before adding the candidate setting the loading to true...
  test(`Should change the state of loading to true before adding new candidates...`, () => {
    const candidate = {};
    const action = { type: "ADD_CANDIDATE", candidate };
    const state = candidateReducer(undefined, action);
    expect(state).toEqual({
      canLoading: true,
      canError: false,
      candidates: [],
    });
  });

  // after success, updating the state with new data and setting the loading to false...
  test(`Should update the state with new candidate...`, () => {
    const candidate = {
      candidateid: 100,
      firstName: "Bamboo",
      lastName: "Bamboo",
      mobileNumber: 1,
      email: "Bamboo@gmail.com",
      address: "Bamboo",
      state: "Bamboo",
      country: "Bamboo",
      city: "Bamboo",
      zipcode: 1,
      bucketid: 2,
      currentEmployerName: "Bamboo",
      currentJobTitle: "Bamboo",
      createdAt: "2020-05-11T11:54:24.000Z",
      updatedAt: "2020-05-11T11:54:24.000Z",
    };
    const initialValue = {
      canLoading: false,
      canError: false,
      candidates: candidateData,
    };
    const action = { type: "ADD_CANDIDATE_SUCCESS", candidate };
    const state = candidateReducer(initialValue, action);
    expect(state).toEqual({
      canLoading: false,
      canError: false,
      candidates: [...candidateData, candidate],
    });
  });

  //getting user from the api...
  test(`Before getting all the candidates will set the loading to true...`, () => {
    const action = { type: "VIEW_ALL_CANDIDATES" };
    const state = candidateReducer(undefined, action);
    expect(state).toEqual({
      canLoading: true,
      canError: false,
      candidates: [],
    });
  });

  test(`after getting all the candidates will set the candidate with data...`, () => {
    const candidate = {};
    candidate.data = candidateData;
    const action = { type: "VIEW_ALL_CANDIDATES_SUCCESS", candidate };
    const state = candidateReducer(undefined, action);
    expect(state).toEqual({
      canLoading: false,
      canError: false,
      candidates: candidateData,
    });
  });

  test(`getting all the candidates failed will set the candidates with data [] and error -> true...`, () => {
    const action = { type: "VIEW_ALL_CANDIDATES_FAILURE" };
    const state = candidateReducer(undefined, action);
    expect(state).toEqual({
      canLoading: false,
      canError: true,
      candidates: [],
    });
  });
});
