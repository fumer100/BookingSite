// Composables
import { createRouter, createWebHistory } from 'vue-router'
import type { RouterOptions } from 'vue-router'

const routes: RouterOptions["routes"] = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'auftragsformular',
        name: 'MainForm',
        component: () => import('@/views/MainFormView.vue'),
      },
      {
        path: 'kontakt',
        name: 'Contact',
        component: () => import('@/views/ContactView.vue'),
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/AdminView.vue'),
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/components/FDFTest.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
