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
  /*User*/
  getUser(id) {
    return AXIOS.get(`/user/` + id);
  },
  createUser(firstName, lastName) {
    return AXIOS.post(`/user/` + firstName + "/" + lastName);
  },
  getUserWithoutID() {
    return AXIOS.get(`/user`);
  },
  getFavourites() {
    return AXIOS.get(`/user/favourites`);
  },
  searchRepositories(query){
    return AXIOS.get(`/user/github/repositories?q=`+query)
  },

  /*Admin*/
  getUserByUsername(username) {
    return AXIOS.get(`/admin/users/` + username);
  },
  getAnalytics(date) {
    return AXIOS.get(`/admin/analytics?fechaDesde=` + date);
  },
  getRepositories() {
    return AXIOS.get(`/admin/repositories`).then(response => {
      return response;
    });
  },
  getUserAmount(id) {
    return AXIOS.get(`/admin/repositories/` + id);
  },
  getAllUsers() {
    return AXIOS.get(`/admin/users`);
  }
};
