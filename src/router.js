import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Settings from "./views/Settings.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("./views/Favorites.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./views/Settings.vue")
    }
  ]
});
