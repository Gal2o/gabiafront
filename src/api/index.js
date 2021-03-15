import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://139.150.76.156:8001'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push('/login')
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) {
        return onUnauthorized()
      }

      throw Error(result)
    })
}

export const book = {
  fetch() {
    return request('get', '/book-service/books')
  },
  fetchWithPage(page) {
    return request('get', '/book-service/books?page=' + page)
  },
  fetchDetails(id) {
    return request('get', '/book-service/books/' + id)
  }
}
