import { createRouter, createWebHistory, RouterView } from 'vue-router';

import RoadmapIndex from '@/views/roadmap/Index.vue'
import Home from '@/views/Home.vue'
import Components from '@/views/Components.vue';
import CompanyIndex from '@/views/company/Index.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import ContentIndex from '@/views/content/index.vue'
import AddContent from '@/views/content/Add-Content.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Codi homepage',
        showNavigationBars: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Inloggen',
        showNavigationBars: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Registreren',
        showNavigationBars: false,
      },
    },
    {
      path: '/company',
      name: 'company',
      component: RouterView,
      redirect: { name: 'company.overview' },
      children: [
        {
          path: '',
          name: 'company.overview',
          component: CompanyIndex,
          meta: {
            title: 'Bedrijfsoverzicht',
            showNavigationBars: true,
          },
        },
        {
          path: 'roadmap',
          name: 'company.roadmap',
          component: RoadmapIndex,
          meta: {
            title: 'Bedrijfsroadmap',
            showNavigationBars: true,
          },
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/About.vue')
    },
    {
      path: '/content-base',
      name: 'content.base',
      component: ContentIndex,
      meta: {
        title: 'Kennisbank',
        showNavigationBars: true,
      },
    },
    {
      path: '/content-base-add',
      name: 'content.add',
      component: AddContent,
      meta: {
        title: 'Kennisbank',
        showNavigationBars: true,
      },
    },
    {
      path: '/components',
      name: 'components',
      component: Components,
      meta: {
        title: 'Componenten',
        showNavigationBars: true,
      },
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' },
    },
  ]
})

export default router
