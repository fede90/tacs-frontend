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
    },

    /* Rutas admin */
    {
      path: "/admin/userdata",
      name: "userdata",
      component: () => import("./views/admin/UserData.vue")
    },
    {
      path: "/admin/repofav",
      name: "repofav",
      component: () => import("./views/admin/RepoFav.vue")
    },
    {
      path: "/admin/registered-repositories",
      name: "registered-repositories",
      component: () => import("./views/admin/RegisteredRepo.vue")
    },
    {
      path: "/admin/repo-lang-common",
      name: "repo-lang-common",
      component: () => import("./views/admin/RepoLangCommon.vue")
    }
  ]
});
