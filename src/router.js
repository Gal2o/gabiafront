import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/dashboard/Login'),
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: { name: '메인화면', auth: true },
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
          meta: { name: '내 정보', auth: true },
        },
        {
          name: 'Notice',
          path: 'pages/notice',
          component: () => import('@/views/dashboard/pages/Notice'),
          meta: { name: '공지사항', auth: true },
        },
        {
          name: 'BookList',
          path: 'pages/BookList',
          component: () => import('@/views/dashboard/pages/BookList'),
          meta: { name: '도서목록', auth: true },
        },
        {
          name: 'BookRequest',
          path: 'pages/BookRequest',
          component: () => import('@/views/dashboard/pages/BookRequest'),
          meta: { name: '도서신청', auth: true },
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
    next('/login')
    return
  }
  if (from.path === '*' && to.path === '/logout') {
    next('/login')
    return
  }
  next()
})

export default router
