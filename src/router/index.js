import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Insert from '../views/Insert.vue'
import Hello from '../views/Hello.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fin',
    name: 'Insert',
    component: Insert
  },
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
