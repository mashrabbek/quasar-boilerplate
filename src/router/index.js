import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import routes from "./routes";

Vue.use(VueRouter);

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

Router.beforeEach(async (to, from, next) => {
  //
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );
  console.log({ store });
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  console.log({ isLoggedIn });
  if (!isPublic && !isLoggedIn) {
    console.log({ isLoggedIn1: isLoggedIn });

    return next({
      path: "/login",
      query: {
        redirect: to.fullPath
      } // Store the full path to redirect the user to after login
    });
  }
  next();
});

export default Router;
