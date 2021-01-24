import Vue from "vue";
import Vuex from "vuex";

import { layout } from "@/store/modules/layout.js";
import { auth } from "@/store/modules/auth.js";
import { userdata } from "@/store/modules/userdata.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    auth,
    userdata
  }
});

export default store;
