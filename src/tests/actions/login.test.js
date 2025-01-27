import { userLogin,userLoginSuccess } from '../../actions/login';
import { LOGIN_REQUEST,LOGIN_REQUEST_SUCCESS } from '../../actions/action';

/****
 * assert Method used: toEqual(),any(dataType) 
 * toEqual() - which will compare two objects, 
 * we should not use toBe for comparing obj...
 * 
 * any -> we will use this for id's which we dont know what its going to be... but we know what type 
 * it is 
 * ex: expect.any(Number),expect.any(String)
 *  */

//to test the user actions for the logged in user...
describe('Login Module...validation', () => {
    test('checking userLogin Modules...', () => {
        const expectedAction = {
            type: LOGIN_REQUEST,
            login: {
                loading: true
            }
        }
        expect(userLogin()).toEqual(expectedAction);
    });

    //checking whether true is coming...    
    test('Login sucess is true...', () => {
        const x = userLoginSuccess({ role: "ping-pong",loginSuccess: true  });
        expect(x).toEqual({
            type: LOGIN_REQUEST_SUCCESS,
            login: {
                role:"ping-pong",
                loginSuccess:true
            }
        });
    });

})



// // describe('Update user Module...Validation', () => {
// //     test('Updating the user with valid Input', () => {
// //         const x = updateUser(10, { x: "test" });
// //         expect(x).toEqual({
// //             type: 'UPDATE_USER',
// //             userid: 10,
// //             user: {
// //                 x: "test"
// //             }
// //         })

// //     });

// //     test('Updating the user with out Input', () => {
// //         const x = updateUser(10, {});
// //         expect(x).toEqual({
// //             type: 'UPDATE_USER',
// //             userid: 10,
// //             user: {
// //             }
// //         })

// //     });
// });