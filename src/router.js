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
    /*TODO: poner Auth en true??? */
    {
      path: "/admin/userdata",
      name: "userdata",
      component: () => import("./views/admin/UserData.vue"),
      meta: { Auth: false, title: "Userdata" }
    },
    {
      path: "/admin/repofav",
      name: "repofav",
      component: () => import("./views/admin/RepoFav.vue"),
      meta: { Auth: false, title: "Repo fav" }
    },
    {
      path: "/admin/registered-repositories",
      name: "registered-repositories",
      component: () => import("./views/admin/RegisteredRepo.vue"),
      meta: { Auth: false, title: "Analytis" }
    },
    {
      path: "/admin/repo-lang-common",
      name: "repo-lang-common",
      component: () => import("./views/admin/RepoLangCommon.vue"),
      meta: { Auth: false, title: "repo-lang-common" }
    },

    /*Ruta user*/
    {
      path: "/user/favourites",
      name: "favourites",
      component: () => import("./views/user/Favourites.vue"),
      meta: { Auth: true, title: "Favourites" }
    },
    {
      path: "/user/repositories",
      name: "repositories",
      component: () => import("./views/user/Repositories.vue"),
      meta: { Auth: true, title: "Repositories" }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  var token = Vue.cookies.get("token");
  if (to.meta.Auth && !token) {
    next({ path: "/signin" });
  } else {
    next();
  }
});

export default router;
