import Vue from "vue";
import Router from "vue-router";
import Signin from "./views/Signin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "signin",
      component: Signin
    },
    {
      path: "/home",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    }
  ]
});
