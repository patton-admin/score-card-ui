import {
    addCandidate, addCandidateSuccess, addCandidateFailure, viewCandidate, viewCandidateSuccess,
    viewCandidateFailure
} from '../../actions/candidate';
import { ADD_CANDIDATE, ADD_CANDIDATE_SUCCESS, ADD_CANDIDATE_FAILURE, VIEW_ALL_CANDIDATES, VIEW_ALL_CANDIDATES_SUCCESS, VIEW_ALL_CANDIDATES_FAILURE } from '../../actions/action';


/*****
 * to test the candidate modules...
 */

describe('Create Candidate Module...validation', () => {
    test('Triggering the action...', () => {
        const x = addCandidate({});
        expect(x).toEqual({
            type: ADD_CANDIDATE,
            candidate: {}
        });
    });

    // to check how the input is coming... when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addCandidate({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_CANDIDATE,
            candidate: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    test('created new candidate successfully to the system with valid inputs...', () => {
        const x = addCandidateSuccess({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_CANDIDATE_SUCCESS,
            candidate: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    // to check when action fails. when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addCandidateFailure({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_CANDIDATE_FAILURE
        });
    });

})

/***
 * to get all the users from the database...
 */
describe(`Getting all the Candidate Module`, () => {

    it(`Triggering the getAllCandidate action`, () => {
        expect(viewCandidate()).toEqual(
            {
                type: VIEW_ALL_CANDIDATES,
                candidate: {}
            }
        )
    })

    it(`Triggering the getAllUser action with different inputs`, () => {
        const payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(viewCandidate(payload)).toEqual(
            {
                type: VIEW_ALL_CANDIDATES,
                candidate: payload
            }
        )
    })

    it(`getAllJobOrderSuccess action with proper inputs`, () => {
        let payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(viewCandidateSuccess(payload)).toEqual(
            {
                type: VIEW_ALL_CANDIDATES_SUCCESS,
                candidate: payload
            }
        )
    })

    it(`Triggering the getAllJobOrderFailure`, () => {
        let payload = { firstName: "bigbamboo", lastName: "gigantic..." };
        expect(viewCandidateFailure(payload)).toEqual(
            {
                type: VIEW_ALL_CANDIDATES_FAILURE
            }
        )
    })

})