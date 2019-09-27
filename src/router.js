import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);
function isLoggedIn(to, from, next) {
  if (!Vue.cookies.get("token")) {
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
      beforeEnter: isLoggedIn
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
  if (to.meta.Auth && !Vue.cookies.get("token")) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
