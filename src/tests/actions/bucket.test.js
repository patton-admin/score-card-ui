import { addBucket, addBucketSuccess, addBucketFailure, viewBucketSuccess, viewBucketFailure, viewBucket } from '../../actions/bucket';
import {
    GET_ALL_BUCKET, GET_ALL_BUCKET_SUCCESS, GET_ALL_BUCKET_FAILURE, ADD_BUCKET,
    ADD_BUCKET_SUCCESS, ADD_BUCKET_FAILURE
} from '../../actions/action';


/*****
 * to test the bucket modules...
 */

describe('Create bucket Module...validation', () => {
    test('Triggering the action...', () => {
        const x = addBucket({});
        expect(x).toEqual({
            type: ADD_BUCKET,
            bucket: {}
        });
    });

    // to check how the input is coming... when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addBucket({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_BUCKET,
            bucket: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    test('created new bucket successfully to the system with valid inputs...', () => {
        const x = addBucketSuccess({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_BUCKET_SUCCESS,
            bucket: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    // to check when action fails. when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addBucketFailure({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_BUCKET_FAILURE
        });
    });

})

/***
 * to get all the users from the database...
 */
describe(`Getting all the bucket Module`, () => {

    it(`Triggering the getAllBucket action`, () => {
        expect(viewBucket()).toEqual(
            {
                type: GET_ALL_BUCKET,
                bucket: {}
            }
        )
    })

    it(`Triggering the getAllBucket action with different inputs`, () => {
        const payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(viewBucket(payload)).toEqual(
            {
                type: GET_ALL_BUCKET,
                bucket: payload
            }
        )
    })

    it(`getAllJobOrderSuccess action with proper inputs`, () => {
        let payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(viewBucketSuccess(payload)).toEqual(
            {
                type: GET_ALL_BUCKET_SUCCESS,
                bucket: payload
            }
        )
    })

    it(`Triggering the getAllJobOrderFailure`, () => {
        let payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(viewBucketFailure(payload)).toEqual(
            {
                type: GET_ALL_BUCKET_FAILURE
            }
        )
    })

})