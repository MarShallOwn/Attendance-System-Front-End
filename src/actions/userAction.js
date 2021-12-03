import { userConstants } from "../constants"
import { userService } from "../services/userService";

const login = (username, password, navigate) => {
    return dispatch => {
        dispatch(request({username}));

        userService.login(username,password)
        .then(user => {
            dispatch(success(user));
            navigate("/")
        })
        .catch(err => dispatch(failure(err)))
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const logout = () => {
    userService.logout();
    return ({type: userConstants.LOGOUT})
}

export const userActions = {
    login,
    logout
}