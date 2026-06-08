import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { PATH_DEFAULT, PATH_NOT_FOUND } from '@/shared/constants/routes'

import { auth, base, errors, user } from './modules'
import { authMiddleware } from './middleware/auth'

const routes: RouteRecordRaw[] = [
  ...auth,
  ...user,
  ...base,
  ...errors,
  { path: '/:pathMatch(.*)*', redirect: PATH_NOT_FOUND },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || PATH_DEFAULT),
  routes,
})

router.beforeEach(authMiddleware)

export { router }
