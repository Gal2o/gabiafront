import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: '메인화면',
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
          meta: '내 정보',
        },
        {
          name: 'Notice',
          path: 'pages/notice',
          component: () => import('@/views/dashboard/pages/Notice'),
          meta: '공지사항',
        },
        {
          name: 'BookList',
          path: 'pages/BookList',
          component: () => import('@/views/dashboard/pages/BookList'),
          meta: '도서목록',
        },
        {
          name: 'BookRequest',
          path: 'pages/BookRequest',
          component: () => import('@/views/dashboard/pages/BookRequest'),
          meta: '도서신청',
        },
      ],
    },
  ],
})
