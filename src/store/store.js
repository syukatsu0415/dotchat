import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    no: null,
    // sid: "",
    name: "",
    avatar: 0,
    offsetX: 0,
  },
  getters: {},
  mutations: {
    changeNo(state, arg) {
      state.no = arg;
    },
    // changeSid(state, arg) {
    //   state.sid = arg;
    // },
    changeName(state, arg) {
      state.name = arg;
    },
    changeAvatar(state, arg) {
      state.avatar = arg;
    },
    changeOffsetX(state, arg) {
      state.offsetX = arg;
    },
  },
  actions: {},
  modules: {},
});
