import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const SET_TABS = "SET_TABS";
export const SET_DATA = "SET_DATA";

export default new Vuex.Store({
  state: {
    tabs: [],
    data: [],
  },
  mutations: {
    [SET_TABS](state, tabs) {
      state.tabs = tabs;
    },
    [SET_DATA](state, data) {
      state.data = data;
    },
  },
  actions: {
    loadTabs({ commit }) {
      //logic go get tabs
    },
  },
});
