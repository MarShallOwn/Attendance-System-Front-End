import axios from "axios";
import {userService} from './services/userService'
import { authHeader } from './helpers/auth-helper'

axios.interceptors.request.use(config => {
    config.headers.Authorization = authHeader()
    return config
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(res => {
    if (res.status === 401) {

        // auto logout if 401 response returned from api
        userService.logout();
        window.location.reload(true);
    }

    return res;
})


export default axios