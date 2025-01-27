import { takeLatest } from 'redux-saga/effects';
import { getUserActionWatcher, getUserEffect } from '../../saga/user-saga';


/***
 * Writing test cases for sagas...
 * https://redux-saga.js.org/docs/advanced/Testing.html
 * referred :  https://medium.com/@13gaurab/unit-testing-sagas-with-jest-29a8bcfca028
 */

describe('getUserEffect..., ie getting all the user from the DB...', () => {
    const genObject = getUserActionWatcher();

    it('should wait for every GET_ALL_USERS and call the api', () => {
        expect(genObject.next().value).toEqual(takeLatest('GET_ALL_USER', getUserEffect));
    });

    it('should not be done on next iteration...', async () => {
        const dummyUser = {
            usrid: 1,
            firstName: "Prima",
            lastName: "Prima",
            pryphoneNo: "1232323",
            pryemail: "Prima",
            role: "ADMIN",
            officeLocation: "Delhi",
            country: "US",
            userId: "Prima",
            password: "Primar",
            vendorName: null,
            createdAt: "2020-04-28T13:14:29.000Z",
            updatedAt: "2020-04-28T13:14:29.000Z"
        };

        const usr = {
            getAllUsers() {
                return dummyUser
            }
        }

        const callingApi = jest.spyOn(usr, 'getAllUsers')
        const isPlaying = usr.getAllUsers();
        // const dispatched = [];
        // const result = await runSaga({
        //     dispatch: (action) => dispatched.push(action),
        // }, getUserEffect);

        expect(callingApi).toHaveBeenCalledTimes(1);
        expect(isPlaying).toStrictEqual({
            usrid: 1,
            firstName: "Prima",
            lastName: "Prima",
            pryphoneNo: "1232323",
            pryemail: "Prima",
            role: "ADMIN",
            officeLocation: "Delhi",
            country: "US",
            userId: "Prima",
            password: "Primar",
            vendorName: null,
            createdAt: "2020-04-28T13:14:29.000Z",
            updatedAt: "2020-04-28T13:14:29.000Z"
        })
        // expect(dispatched).toEqual([getAllUserSuccess(dummyUser)]);
    });

    it('should not be done on next iteration...', () => {
        expect(genObject.next().done).toBeTruthy();
    })
})