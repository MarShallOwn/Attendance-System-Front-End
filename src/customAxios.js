import axios from "axios";
import { userService } from "./services/userService";
import { authHeader } from "./helpers/auth-helper";
import reduxStore from "./store";

const { dispatch } = reduxStore;

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = authHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {

    // if the accesstoken expired then logout and reload to go to logout page
    if (error.response.status === 401) {
      // auto logout if 401 response returned from api
      userService.logout();
      window.location.reload(true);
    }

    // if he tried to access the endpoint and the accesstoken time out ended we go to this condition
    if (error.response.status === 403) {
      // we fetch the refresh token from the localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      // we make a request to the backend and request a new access token with the refresh token
      return axios
        .post("/auth/token/refresh/", { refresh: user.tokens.refresh })
        .then((res) => {
          user.tokens.access = res.data.access;
          localStorage.setItem("user", JSON.stringify(user));

          // after getting the new access point we retry the request that was rejected by the endpoint at first
          return axios.request(error.config);
        })
        .catch((err) => {
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

export default axios;
