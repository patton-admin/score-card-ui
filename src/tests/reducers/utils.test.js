import { utilReducer } from "./../../reducers/utils";

describe(`util Reducer functionality`, () => {
  test(`Should setup the default values for the utils...`, () => {
    const state = utilReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      isOpen: false,
      isOpenBucket: false,
      initialVal: {},
    });
  });

  test(`Should set the modal values for the utils for isOpen...`, () => {
    const action = { type: "MODAL_OPEN", isOpen: true, initialVal: {} };
    const state = utilReducer(undefined, action);
    expect(state).toEqual({
      isOpen: true,
      isOpenBucket: false,
      initialVal: {},
    });
  });

  test(`Should set the modal values for the util for isOpenBucket...`, () => {
    const action = {
      type: "MODAL_OPEN_BUCKET",
      isOpenBucket: true,
      initialVal: {},
    };
    const state = utilReducer(undefined, action);
    expect(state).toEqual({
      isOpen: false,
      isOpenBucket: true,
      initialVal: {},
    });
  });
});
