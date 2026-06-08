import type { RouteRecordRaw } from 'vue-router'

import { PATH_AUTH } from '@/shared/constants/routes'

export const auth: RouteRecordRaw[] = [
  {
    path: PATH_AUTH,
    component: () => import('@/layouts/LayoutAuth.vue'),
    children: [
      {
        path: '',
        name: 'Auth',
        component: () => import('@/pages/auth/QAuth.vue'),
      },
    ],
  },
]
