import { createStore } from "vuex";

export default createStore({
  state: {
    session: null,
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.session = payload;
    },
  },
  actions: {
    setSession({ commit }, payload) {
      commit("SET_SESSION", payload);
    },
  },
  modules: {},
});
