import { getAllJob, addJob, addJobSuccess, addJobFailure, getAllJobSuccess, getAllJobFailure } from '../../actions/job';
import { GET_ALL_JOB, ADD_JOB, ADD_JOB_SUCCESS, ADD_JOB_FAILURE, GET_ALL_JOB_SUCCESS, GET_ALL_JOB_FAILURE } from '../../actions/action';


/*****
 * to test the user modules...
 */

describe('Create JobOrder Module...validation', () => {
    test('Triggering the action...', () => {
        const x = addJob({});
        expect(x).toEqual({
            type: ADD_JOB,
            jobOrder: {}
        });
    });

    // to check how the input is coming... when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addJob({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_JOB,
            jobOrder: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    test('created new user successfully to the system with valid inputs...', () => {
        const x = addJobSuccess({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_JOB_SUCCESS,
            jobOrder: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    // to check when action fails. when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addJobFailure({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_JOB_FAILURE
        });
    });

})

/***
 * to get all the users from the database...
 */
describe(`Getting all the user Module`, () => {

    it(`Triggering the getALlJobOrders action`, () => {
        expect(getAllJob()).toEqual(
            {
                type: GET_ALL_JOB,
                jobOrder: {}
            }
        )
    })

    it(`Triggering the getAllUser action with different inputs`, () => {
        const payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(getAllJob(payload)).toEqual(
            {
                type: GET_ALL_JOB,
                jobOrder: payload
            }
        )
    })

        it(`getAllJobOrderSuccess action with proper inputs`, () => {
            let payload = {firstName:"bigbamboo",lastName:"gigantic..."};
            expect(getAllJobSuccess(payload)).toEqual(
                {
                    type: GET_ALL_JOB_SUCCESS,
                    jobOrder:payload
                }
            )
        })

        it(`Triggering the getAllJobOrderFailure`, () => {
            let payload = {firstName:"bigbamboo",lastName:"gigantic..."};
            expect(getAllJobFailure(payload)).toEqual(
                {
                    type: GET_ALL_JOB_FAILURE
                }
            )
        })

})