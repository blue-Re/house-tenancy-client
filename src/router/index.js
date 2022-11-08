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
          meta: {
            name: '房东列表'
          },
          component: () => import('@/views/User/OwnerList.vue')
        },
        {
          path: '/user-management/tenant-list',
          name: 'TenantList',
          meta: {
            name: '租户列表',
          },
          component: () => import('@/views/User/TenantList.vue')
        },
        {
          path: '/user-management/manager-list',
          name: 'ManagerList',
          meta: {
            name: '管理员列表',
          },
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
          meta: {
            name: '房屋列表'
          },
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
          meta: {
            name: '新闻列表',
          },
          component: () => import('@/views/News/component/NewsList.vue')
        },
        {
          path: '/news-management/news-detail',
          name: 'NewsDetail',
          meta: {
            name: '新闻详情',
          },
          component: () => import('@/views/News/component/NewsDetail.vue')
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
          meta: {
            name: '故障列表',
          },
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
          name: 'OrderList',
          meta: {
            name: '订单列表',
          },
          component: () => import('@/views/Order/Order.vue')
        },
      ]
    },
  ]
})

export default router
