import authAxios from "../customAxios";

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    authAxios
      .post(`/login`, { username, password })
      .then((res) => {
        if (res.data.statusText === "ok") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          resolve(res.data.user);
        } else {
          reject(res.data.err);
        }
      })
      .catch((err) => reject(handleUnAuth(err)));
  });
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
};

const handleUnAuth = (err) => {
  if (err.response.status === 401) {
    logout();
    window.location.reload(true);
  }

  return err;
};

export const userService = {
  login,
  logout,
};
