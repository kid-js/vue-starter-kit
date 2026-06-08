import type { NavigationGuard } from 'vue-router'

import { useAuthStore } from '@/stores'

import { useAuth } from '@/shared/composables'
import { PATH_AUTH, PATH_DEFAULT } from '@/shared/constants'

export const authMiddleware: NavigationGuard = async (to) => {
  const authStore = useAuthStore()
  const { restoreSession } = useAuth()

  authStore.checkAuth() // update actual auth state

  if (to.meta.needsAuth && !authStore.isAuth) {
    // try to restore session if refresh token is present
    const isSessionRestored = await restoreSession()

    if (!isSessionRestored) {
      return { path: PATH_AUTH, query: { redirect: to.path } }
    }
  }

  if (to.path === PATH_AUTH && authStore.isAuth) {
    return PATH_DEFAULT
  }

  if (!to.meta.needsAuth && !authStore.isAuth && authStore.hasSession) {
    // if auth is not required, try to restore session on the background
    void restoreSession({ isSilent: true })
  }

  return true
}
