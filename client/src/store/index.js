import Vue from "vue";
import Vuex from "vuex";
import axios from "@/plugins/axios";

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
      return axios.get("/tabs").then(({ data }) => {
        commit(SET_TABS, data);
        return data;
      });
    },
  },
});
