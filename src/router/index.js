import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { isTokenExpired } from "@/utils/auth";
import DataService from "@/services/data.service";
import store from "@/store/index";
import StorageService from "src/services/storage.service";
import { AuthService } from "src/services/auth.service";

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
  //const isLoggedIn = store.getters["auth/isLoggedIn"];
  const isLoggedIn = !(await isTokenExpired());
  const isAllLoaded = store.getters["userdata/isAllLoaded"];

  console.log({ isPublic, onlyWhenLoggedOut, isLoggedIn, isAllLoaded });

  if (!isPublic && !isLoggedIn) {
    console.log({ isLoggedIn: isLoggedIn });

    return next({
      path: "/login",
      query: {
        redirect: to.fullPath
      } // Store the full path to redirect the user to after login
    });
  }
  // if refresh happens
  if (isLoggedIn && !isAllLoaded) {
    try {
      // refreshPage
      // await DataService.loadAll();
    } catch (error) {
      console.log({ error });

      await AuthService.logout();

      // return next({
      //   path: "/login",
      //   query: {
      //     redirect: to.fullPath
      //   } // Store the full path to redirect the user to after login
      // });
    }
  }

  //!!! Don't Change
  if (isLoggedIn && onlyWhenLoggedOut) {
    return next("/");
  }

  next();
});

export default Router;
