import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify)
// 색깔 바꾸기 초기 값
const theme = {
  primary: '#53739b', // 첫 메뉴바 셀렉트 색
  secondary: '#8977ad', // 다크모드 토글 버튼 바뀌는 색
  accent: '#9C27b0',
  info: '#00CAE3',
}

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
