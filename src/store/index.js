import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/usermanger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    usermanger: user
  }
})
