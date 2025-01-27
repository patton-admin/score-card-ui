import { runSaga } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import {
  getAllJobOrderWatcher,
  getAllJobOrderEffect,
} from "../../saga/jobOrder-saga";

/***
 * Writing test cases for sagas...
 * https://redux-saga.js.org/docs/advanced/Testing.html
 * referred :  https://medium.com/@13gaurab/unit-testing-sagas-with-jest-29a8bcfca028
 */

describe("getjobOrder..., ie getting all the jobOrder from the DB...", () => {
  const genObject = getAllJobOrderWatcher();

  it("should wait for every GET_ALL_ORDERS and call the api", () => {
    expect(genObject.next().value).toEqual(
      takeLatest("GET_ALL_JOB", getAllJobOrderEffect)
    );
  });

  it("should not be done on next iteration...", async () => {
    const dummyJobOrder = {
      jobid: 1,
      jobTitle: "New Job Order",
      jobType: "New ",
      state: "New ",
      city: "New ",
      zipcode: null,
      clientName: "",
      vendorName: "",
      accountManager: null,
      jobstatus: null,
      priority: "1",
      noofpositions: null,
      totalSubmissions: 1,
      yearOfExp: null,
      rate: 1,
      createdAt: "2020-05-04T08:14:47.000Z",
      updatedAt: "2020-05-04T08:14:47.000Z",
    };

    const job = {
      getDummyJobOrder() {
        return dummyJobOrder;
      },
    };

    const callingApi = jest.spyOn(job, "getDummyJobOrder");
    const isPlaying = job.getDummyJobOrder();
    // const dispatched = [];
    // const result = await runSaga({
    //     dispatch: (action) => dispatched.push(action),
    // }, getUserEffect);

    expect(callingApi).toHaveBeenCalledTimes(1);
    expect(isPlaying).toStrictEqual({
      jobid: 1,
      jobTitle: "New Job Order",
      jobType: "New ",
      state: "New ",
      city: "New ",
      zipcode: null,
      clientName: "",
      vendorName: "",
      accountManager: null,
      jobstatus: null,
      priority: "1",
      noofpositions: null,
      totalSubmissions: 1,
      yearOfExp: null,
      rate: 1,
      createdAt: "2020-05-04T08:14:47.000Z",
      updatedAt: "2020-05-04T08:14:47.000Z",
    });
    // expect(dispatched).toEqual([getAllUserSuccess(dummyUser)]);
  });

  it("should not be done on next iteration...", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
