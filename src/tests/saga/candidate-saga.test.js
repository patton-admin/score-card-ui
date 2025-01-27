import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { getAllCandidateEffect, getAllCandidateWatcher } from '../../saga/candidate-saga';


/***
 * Writing test cases for sagas...
 * https://redux-saga.js.org/docs/advanced/Testing.html
 * referred :  https://medium.com/@13gaurab/unit-testing-sagas-with-jest-29a8bcfca028
 * this one looks good: https://medium.com/@aniketpaul1592/unit-tests-for-redux-sagas-and-apis-87804644bb3 - need to try it out...
 */

describe('getAllCandidate..., ie getting all the candidate from the DB...', () => {
    const genObject = getAllCandidateWatcher();

    it('should wait for every VIEW_ALL_CANDIDATES and call the api', () => {
        expect(genObject.next().value).toEqual(takeLatest('VIEW_ALL_CANDIDATES', getAllCandidateEffect));
    });

    it('should not be done on next iteration...', async () => {
        const dummy = {
            candidateid: 1,
            firstName: "Aravind",
            lastName: "Murugesan",
            mobileNumber: 248,
            email: "aravind111991@gmail.com",
            address: "30387",
            state: "Mi",
            country: "United States",
            city: "Southfield",
            zipcode: 48377,
            currentEmployerName: "Patton labs Inc",
            currentJobTitle: "Software Developer",
            createdAt: "2020-05-01T11:45:03.000Z",
            updatedAt: "2020-05-01T11:45:03.000Z"
        };

        const candidate = {
            getDummyCandidate() {
                return dummy
            }
        }

        const callingApi = jest.spyOn(candidate, 'getDummyCandidate')
        const isPlaying = candidate.getDummyCandidate();
        // const dispatched = [];
        // const result = await runSaga({
        //     dispatch: (action) => dispatched.push(action),
        // }, getUserEffect);

        expect(callingApi).toHaveBeenCalledTimes(1);
        expect(isPlaying).toStrictEqual(dummy)
        // expect(dispatched).toEqual([getAllUserSuccess(dummyUser)]);
    });

    it('should not be done on next iteration...', () => {
        expect(genObject.next().done).toBeTruthy();
    })
})