import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { getAllBucketWatcher, getAllBucketEffect } from '../../saga/bucket-saga';


/***
 * Writing test cases for sagas...
 * https://redux-saga.js.org/docs/advanced/Testing.html
 * referred :  https://medium.com/@13gaurab/unit-testing-sagas-with-jest-29a8bcfca028
 */

describe('getAllBucket..., ie getting all the bucket data from the DB...', () => {
    const genObject = getAllBucketWatcher();

    it('should wait for every GET_ALL_BUCKET and call the api', () => {
        expect(genObject.next().value).toEqual(takeLatest('GET_ALL_BUCKET', getAllBucketEffect));
    });

    it('should not be done on next iteration...', async () => {
        const dummy = {
            bucketid: 1,
            bucketOwner: "Test",
            bucketName: "Test",
            bucketDesc: "Test",
            bucketDetailedDesc: "Test Description",
            pryemail: null,
            createdAt: "2020-05-06T11:06:54.000Z",
            updatedAt: "2020-05-06T11:06:54.000Z"
        };

        const bucket = {
            getBucket() {
                return dummy
            }
        }

        const callingApi = jest.spyOn(bucket, 'getBucket')
        const isPlaying = bucket.getBucket();
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