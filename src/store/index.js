import Vue from "vue";
import Vuex from "vuex";
import {moduleGlobal} from "./global/global";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global: moduleGlobal,
  },
});
