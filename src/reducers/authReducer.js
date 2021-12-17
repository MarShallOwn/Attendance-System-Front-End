import { userConstants } from "../constants";

// if we closed the session or server and opened again then the state will get the data from localstorage if available
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}

export default authReducer