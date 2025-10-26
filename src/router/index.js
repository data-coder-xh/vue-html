import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'news-list',
    component: () => import('../views/NewsList.vue')
  },
  {
    path: '/news/new',
    name: 'news-new',
    component: () => import('../views/NewsForm.vue')
  },
  {
    path: '/news/:id',
    name: 'news-edit',
    component: () => import('../views/NewsForm.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
