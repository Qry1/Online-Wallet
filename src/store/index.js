import { createStore } from 'vuex';
import auth from './modules/auth.module'
import request from './modules/request.module'

export default createStore({
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 3000)
    }
  },
  modules: {
    auth,
    request
  }
})