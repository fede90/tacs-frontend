import axios from "axios";

const AXIOS = axios.create({
  baseURL: `/api`,
  timeout: 1000
});

export default {
  signup(user) {
    return AXIOS.post(`/signup`, user);
  },
  login(user) {
    return AXIOS.post(`/login`, user);
  },
  signout(token, user) {
    if (token) {
      AXIOS.defaults.headers.common["Authorization"] = token;
    }
    return AXIOS.post(`/logout`, user);
  },
  getUser(id) {
    return AXIOS.get(`/user/` + id);
  },
  createUser(firstName, lastName) {
    return AXIOS.post(`/user/` + firstName + "/" + lastName);
  }
};
