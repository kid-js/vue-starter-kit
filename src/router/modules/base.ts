import type { RouteRecordRaw } from 'vue-router'

import { PATH_DEFAULT } from '@/shared/constants/routes'

// since LayoutMain is widely used throughout the app,
// import it synchronously to keep it in initial chunk
import LayoutMain from '@/layouts/LayoutMain.vue'

export const base: RouteRecordRaw[] = [
  {
    path: PATH_DEFAULT,
    component: LayoutMain,
    children: [
      {
        path: '',
        name: 'Main Page',
        component: () => import('@/pages/main/QMain.vue'),
      },
    ],
  },
]
