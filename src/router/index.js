import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Daftar from '../views/Daftar.vue'

const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Home
  },
  {
    path: '/daftar',
    name: 'Daftar',
    component: Daftar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
