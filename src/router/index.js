import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView/WelcomeView.vue'
import SettingsView from '../views/SettingsView/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/WelcomeView/WelcomeView.vue')
    }
  ]
})

export default router
