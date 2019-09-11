import axios from 'axios'

const AXIOS = axios.create({
  baseURL: `/api`,
  timeout: 1000
});


export default {
    signup() {
        return AXIOS.get(`/signup`);
    },
    getUser(id) {
        return AXIOS.get(`/user/` + id);
    },
    createUser(firstName, lastName) {
        return AXIOS.post(`/user/` + firstName + '/' + lastName);
    },

}


