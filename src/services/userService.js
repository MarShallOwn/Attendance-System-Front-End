import axios from 'axios'

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          resolve(res.data.data);
        } else {
          reject(res.data.error);
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
  if (err.response.status === 403) {
    logout();
    window.location.reload(true);
  }

  return err;
};

export const userService = {
  login,
  logout,
};
