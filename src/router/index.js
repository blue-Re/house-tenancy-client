import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: '/user-management',
      name: 'UserManagement',
      component: () => import('@/views/User/User.vue'),
      redirect: '/user-management/owner-list',
      children: [
        {
          path: '/user-management/owner-list',
          name: 'OwnerList',
          component: () => import('@/views/User/OwnerList.vue')
        },
        {
          path: '/user-management/tenant-list',
          name: 'TenantList',
          component: () => import('@/views/User/TenantList.vue')
        },
        {
          path: '/user-management/manager-list',
          name: 'ManagerList',
          component: () => import('@/views/User/ManagerList.vue')
        },
      ]
    },
    {
      path: '/house-management',
      name: 'HouseManagement',
      component: () => import('@/views/House/House.vue'),
      redirect: '/house-management/house-list',
      children: [
        {
          path: '/house-management/house-list',
          name: 'HouseList',
          component: () => import('@/views/House/House.vue')
        },
      ]
    },
    {
      path: '/news-management',
      name: 'NewsManagement',
      component: () => import('@/views/News/News.vue'),
      redirect: '/news-management/news-list',
      children: [
        {
          path: '/news-management/news-list',
          name: 'NewsList',
          component: () => import('@/views/News/News.vue')
        },
      ]
    },
    {
      path: '/trouble-management',
      name: 'Trouble',
      component: () => import('@/views/Trouble/Trouble.vue'),
      redirect: '/trouble-management/trouble-list',
      children: [
        {
          path: '/trouble-management/trouble-list',
          name: 'TroubleList',
          component: () => import('@/views/Trouble/Trouble.vue')
        },
      ]
    },
    {
      path: '/order-management',
      name: 'OrderManagement',
      component: () => import('@/views/Order/Order.vue'),
      redirect: '/order-management/order-list',
      children: [
        {
          path: '/order-management/order-list',
          name: 'TroubleManagement',
          component: () => import('@/views/Order/Order.vue')
        },
      ]
    },
  ]
})

export default router
