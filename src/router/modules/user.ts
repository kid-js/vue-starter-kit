import type { RouteRecordRaw } from 'vue-router'

import { PATH_USER } from '@/shared/constants/routes'

// since LayoutMain is widely used throughout the app,
// import it synchronously to keep it in initial chunk
import LayoutMain from '@/layouts/LayoutMain.vue'

export const user: RouteRecordRaw[] = [
  {
    path: PATH_USER,
    component: LayoutMain,
    children: [
      {
        path: '',
        name: 'User Profile',
        component: () => import('@/pages/user/QUser.vue'),
        meta: {
          needsAuth: true,
        },
      },
    ],
  },
]
