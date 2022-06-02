import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getCode from "./module/getCodeValue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //全局设置的对象
    userinfo: {}, //账户信息
    basicinfo: {}, //志愿者信息
    areainfo: {} //区域信息
    // layoutid: {} //首页布局所需要的id
  },
  getters: {
    //获取最新的数据--实时监听
    getUser(state) {
      //最新的user  获取最新的数据 this.$store.getters.getUser
      return state.userinfo;
    },
    getBasic(state) {
      //最新的personnel
      return state.basicinfo;
    },
    getArea(state) {
      return state.areainfo;
    }
    /* getLayoutid(state) {
      return state.layoutid;
    } */
  },
  mutations: {
    //修改参数
    saveUser(state, userinfo) {
      //  调用该方法 this.$store.commit('saveUser',data)
      state.userinfo = userinfo;
    },
    saveBasic(state, basicinfo) {
      state.basicinfo = basicinfo;
    },
    saveArea(state, areainfo) {
      state.areainfo = areainfo;
    }
    /* saveLayoutid(state, layoutid) {
      state.layoutid = layoutid;
    } */
  },
  actions: {
    //修改更多的参数，实际上还是用的mutations
    tosaveUser(store, data) {
      //this.$store.dispatch('tosaveuser',data)
      store.commit("saveUser", data);
    }
  },
  modules: { getCode },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
