import { userReducer } from "../../reducers/users";
import { loginReducer, userReducer } from "../../reducers/loginlogout";
import userData from "./../fixtures/usersFixtures";

describe(`Users functionality`, () => {
  /****************User Module************** */

  //initializing the user reducer
  test(`Should setup the default values for the Users...`, () => {
    const state = userReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      usrLoading: false,
      usrError: false,
      users: [],
    });
  });

  //before adding the user setting the loading to true...
  test(`Should change the state of loading to true before adding new users...`, () => {
    const user = {};
    const initialValue = {
      usrLoading: false,
      usrError: false,
      users: userData,
    };
    const action = { type: "ADD_USER", user };
    const state = userReducer(initialValue, action);
    expect(state).toEqual({
      usrLoading: true,
      usrError: false,
      users: userData,
    });
  });

  //after success, updating the state with new data and setting the loading to false...
  test(`Should update the state with new user...`, () => {
    const user = {
      usrid: 100,
      firstName: "ami",
      lastName: "",
      pryphoneNo: "792",
      pryemail: "ami@patton.com",
      role: "ADMIN",
      officeLocation: "",
      country: "IND",
      userId: "ami@patton",
      password: "ami123",
      vendorName: null,
      createdAt: "2020-05-10T00:53:13.000Z",
      updatedAt: "2020-05-10T00:53:13.000Z",
    };

    const initialValue = {
      usrLoading: false,
      usrError: false,
      users: userData,
    };
    const action = { type: "ADD_USER_SUCCESS", user };
    const state = userReducer(initialValue, action);
    expect(state).toEqual({
      usrLoading: false,
      usrError: false,
      users: [...userData, user],
    });
  });

  //getting user from the api...
  test(`Before getting all the users will set the loading to true...`, () => {
    const action = { type: "GET_ALL_USER" };
    const state = userReducer(undefined, action);
    expect(state).toEqual({
      usrLoading: true,
      usrError: false,
      users: [],
    });
  });

  test(`after getting all the users will set the users with data...`, () => {
    const user = {};
    user.data = userData;
    const action = { type: "GET_ALL_USER_SUCCESS", user };
    const state = userReducer(undefined, action);
    expect(state).toEqual({
      usrLoading: false,
      usrError: false,
      users: userData,
    });
  });

  test(`getting all the users failed will set the users with data [] and error -> true...`, () => {
    const action = { type: "GET_ALL_USER_FAILURE" };
    const state = userReducer(undefined, action);
    expect(state).toEqual({
      usrLoading: false,
      usrError: true,
      users: [],
    });
  });
});

/************Login Module**********/
test(`Should setup the default values for the logins...`, () => {
  const state = loginReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    loginSuccess: false,
    role: "",
    user_id: "",
    loading: false,
    error: false,
  });
});

//successfull login...
test(`Should update after the user logged into the system...`, () => {
  const login = {
    role: "Sadmin",
    loginSuccess: true,
    userId: "RAM",
  };
  const action = { type: "LOGIN_REQUEST_SUCCESS", login };
  const state = loginReducer(undefined, action);

  expect(state).toEqual({
    loginSuccess: login.loginSuccess,
    role: login.role,
    user_id: login.userId,
    loading: false,
    error: false,
  });
});

//user logging failed...
test(`Should update after the user logged in failed...`, () => {
  const action = { type: "LOGIN_REQUEST_ERROR" };
  const state = loginReducer(undefined, action);

  expect(state).toEqual({
    loginSuccess: false,
    role: "",
    user_id: "",
    loading: false,
    error: true,
  });
});
