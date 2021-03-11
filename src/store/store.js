import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { getAuthFromCookie, getUserNumFromCookie, getRoleFromCookie, getUserIdFromCookie } from '../util/cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 81, 158), rgba(137, 198, 225)',
    drawer: null,
    userId: getUserIdFromCookie() || '',
    userNum: getUserNumFromCookie() || '',
    accessToken: getAuthFromCookie() || '',
    role: getRoleFromCookie() || '',
  },
  mutations,
  actions: {
  },
  getters: {
    isLogin (state) {
      return state.userId !== ''
    },
  },
})
