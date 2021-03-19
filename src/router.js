import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Login',
      path: '/Login',
      component: () => import('@/views/dashboard/Login'),
    },
    {
      path: '/',
      redirect: '/Main',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: 'Main',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: { name: '메인화면', auth: true },
        },
        // Pages
        {
          name: 'MyPage',
          path: 'Mypage',
          component: () => import('@/views/dashboard/pages/MyPage'),
          meta: { name: '내 정보', auth: true },
        },
        {
          name: 'Notice',
          path: 'Notice',
          component: () => import('@/views/dashboard/pages/Notice'),
          meta: { name: '공지사항', auth: true },
        },
        {
          name: 'BookList',
          path: 'BookList',
          component: () => import('@/views/dashboard/pages/BookList'),
          meta: { name: '도서목록', auth: true },
        },
        {
          name: 'BookRequest',
          path: 'BookRequest',
          component: () => import('@/views/dashboard/pages/BookRequest'),
          meta: { name: '도서신청', auth: true },
        },
        {
          name: 'BookDetails',
          path: 'BookDetails',
          component: () => import('@/views/dashboard/pages/BookDetails'),
          meta: { name: '도서상세', auth: true },
        },
      ],
    },
    {
      path: '*',
      name: 'Error',
      component: () => import('@/views/dashboard/pages/Error'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    alert('로그인이 필요합니다.')
    next('/Login')
    return
  }

  if (store.getters.isLogin && to.path === '/Login') {
    next('/')
    return
  }

  next()
})

export default router
