import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { Auth: true, title: "Home" }
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue"),
      meta: { Auth: false, title: "Login" },
      beforeEnter: (to, from, next) => {
        // Si existe un token, la sesion existe, por lo cual, redirecciona a home
        // if (window.localStorage.getItem('_token')) {
        if (this.$cookies.get("token")) {
          next({ path: "/" });
        } else {
          next();
        }
      }
    },
    {
      path: "/signout",
      name: "signout",
      component: () => import("./views/Signup.vue"),
      meta: { Auth: true, title: "Log Out" }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.Auth && !window.localStorage.getItem("_token")) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
