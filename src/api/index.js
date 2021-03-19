import router from '../router'

const UNAUTHORIZED = 401

const onUnauthorized = () => {
  alert('로그인이 필요한 서비스 입니다.')
  router.push('/Login')
}

export { UNAUTHORIZED, onUnauthorized }
