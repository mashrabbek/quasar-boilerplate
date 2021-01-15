import Vue from "vue";
import Vuex from "vuex";

import { layout } from "@/store/modules/layout.js";

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      layout
    }
  });

  return Store;
}
