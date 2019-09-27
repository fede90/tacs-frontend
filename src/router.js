import Vue from "vue";
import Router from "vue-router";
import Signin from "./views/Signin.vue";

Vue.use(Router);
function isLoggedIn(to, from, next) {
  if (Vue.cookies.get("token")) {
    next({ path: "/home" });
  } else {
    next();
  }
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "signin",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: { Auth: true, title: "Home" }
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
      meta: { Auth: false, title: "Signin" }
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue"),
      meta: { Auth: false, title: "Registro" },
      beforeEnter: isLoggedIn
    },
    {
      path: "/signout",
      name: "signout",
      component: () => import("./views/Signup.vue"),
      meta: { Auth: true, title: "Log Out" }
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  var token = Vue.cookies.get("token");
  console.log(token);
  console.log(to.meta.Auth && token);

  if (to.meta.Auth && !token) {
    next({ path: "/signin" });
  } else {
    next();
  }
});

export default router;
