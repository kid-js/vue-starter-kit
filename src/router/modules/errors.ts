import type { RouteRecordRaw } from 'vue-router'

import { PATH_NOT_FOUND } from '@/shared/constants/routes'

export const errors: RouteRecordRaw[] = [
  {
    path: PATH_NOT_FOUND,
    component: () => import('@/layouts/LayoutError.vue'),
    children: [
      {
        path: '',
        name: 'Page Not Found',
        component: () => import('@/pages/errors/QPageNotFound.vue'),
      },
    ],
  },
]
