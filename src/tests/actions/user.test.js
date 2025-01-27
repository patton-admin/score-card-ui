import { addUser, updateUser, addUserSuccess, addUserFailure,getAllUser, getAllUserSuccess,getAllUserFailure } from '../../actions/user';
import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_ERROR,GET_ALL_USER, GET_ALL_USER_SUCCESS, GET_ALL_USER_FAILURE } from '../../actions/action';


/*****
 * to test the user modules...
 */

describe('Create User Module...validation', () => {
    test('Triggering the action...', () => {
        const user = {
            firstName: 'xyz',
            lastName: 'zyx',
            pryphoneNo: 'zyx',
            secryphoneNo: 'pingpong',
            pryemail: 'pingpong@gmail.com',
            secryemail: 'pingpong1@gmail.com',
            role: 'admin',
            officeLocation: '',
            country: '',
            createdBy: '',
            updatedBy: '',
            createdDate: '',
            date: '',
            time: '',
            userId: ''
        };
        const x = addUser(user);
        expect(x).toEqual({
            type: ADD_USER,
            user: user
        });
    });

    // to check how the input is coming... when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addUser({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_USER,
            user: {
                firstName: 'aravind',
                lastName: 'Murugesan'
            }
        });
    });

    // to check how the input is coming... when input is there...
    test('created new user successfully to the system with valid inputs...', () => {
        const x = addUserSuccess({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_USER_SUCCESS,
            user: {
                firstName: 'aravind',
                lastName: 'Murugesan',
                pryphoneNo: '',
                secryphoneNo: '',
                pryemail: '',
                secryemail: '',
                role: '',
                officeLocation: '',
                country: '',
                createdBy: '',
                createdDate: '',
                updatedBy: '',
                date: '',
                time: '',
                userId: '',
                password: ''
            }
        });
    });

    // to check when action fails. when input is there...
    test('Triggering the same action with different inputs...', () => {
        const x = addUserFailure({
            firstName: 'aravind',
            lastName: 'Murugesan'
        });
        expect(x).toEqual({
            type: ADD_USER_ERROR
        });
    });

})

/***
 * to get all the users from the database...
 */
describe(`Getting all the user Module`, () => {

    it(`Triggering the getAllUser action`, () => {
        expect(getAllUser()).toEqual(
            {
                type: GET_ALL_USER
            }
        )
    })
    
    it(`Triggering the getAllUser action with different inputs`, () => {
        expect(getAllUser({firstName:"bigbamboo",lastName:"gigantic..."})).toEqual(
            {
                type: GET_ALL_USER
            }
        )
    })
    
    it(`getAllUserSuccess action with proper inputs`, () => {
        let payload = {firstName:"bigbamboo",lastName:"gigantic..."};
        expect(getAllUserSuccess(payload)).toEqual(
            {
                type: GET_ALL_USER_SUCCESS,
                user:payload
            }
        )
    })
    
    it(`Triggering the getAllUserFailure`, () => {
        let payload = {firstName:"bigbamboo",lastName:"gigantic..."};
        expect(getAllUserFailure(payload)).toEqual(
            {
                type: GET_ALL_USER_FAILURE
            }
        )
    })

})