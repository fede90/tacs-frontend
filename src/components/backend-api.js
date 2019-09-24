import axios from "axios";

const AXIOS = axios.create({
  baseURL: `/api`,
  timeout: 1000
});

export default {
  signup(user) {
    const token = window.localStorage.getItem("_token");
    console.log(token);
    if (token) {
      AXIOS.defaults.headers.common["Authorization"] = token;
    }
    return AXIOS.post(`/signup`, user);
  },
  signout(user) {
    window.localStorage.removeItem("_token");
    window.location.reload();
    return AXIOS.delete(`/logout`, user);
  },
  getUser(id) {
    return AXIOS.get(`/user/` + id);
  },
  createUser(firstName, lastName) {
    return AXIOS.post(`/user/` + firstName + "/" + lastName);
  }
};
