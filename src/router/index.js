import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/events/List.vue')
    },
    {
      path: '/events/calendar/:year/:month',
      name: 'calendar',
      component: () => import('../components/events/Calendar.vue')
    },
    {
      path: '/events',
      name: 'event_list',
      component: () => import('../components/events/List.vue')
    },
    {
      path: '/events/create',
      name: 'event_create',
      component: () => import('../components/events/Create.vue')
    },
    {
      path: '/events/:idEvent/edit',
      name: 'event_update',
      component: () => import('../components/events/Edit.vue')
    },
    {
      path: '/types',
      name: 'type_list',
      component: () => import('../components/types/List.vue')
    },
    {
      path: '/types/create',
      name: 'type_create',
      component: () => import('../components/types/Create.vue')
    },
    {
      path: '/types/:idType/edit',
      name: 'type_update',
      component: () => import('../components/types/Edit.vue')
    }
  ]
})

export default router
