export default {
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },
  SET_USERID (state, data) {
    state.userId = data
  },
  CLEAR_USERID (state) {
    state.userId = ''
  },
  SET_ACCESS_TOKEN (state, token) {
    state.accessToken = token
  },
  CLEAR_ACCESS_TOKEN (state) {
    state.accessToken = ''
  },
  SET_ROLE (state, role) {
    state.role = role
  },
  CLEAR_ROLE (state) {
    state.role = ''
  },
  SET_USERNUM (state, data) {
    state.userNum = data
  },
  CLEAR_USERNUM (state) {
    state.userNum = ''
  },
}
