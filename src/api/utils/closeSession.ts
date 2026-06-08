import ky from 'ky'

import { useAuthStore } from '@/stores'
import { getRouter } from '@/api/setup'

import { LOGOUT_ERROR_MESSAGE, PATH_AUTH } from '@/shared/constants'

const redirectToLogin = async (): Promise<void> => {
  const router = getRouter()

  await router?.push({
    path: PATH_AUTH,
    query: { redirect: router?.currentRoute.value.fullPath },
  })
}

const closeSession = async (): Promise<void> => {
  const authStore = useAuthStore()

  try {
    await ky.post('/logout', { prefix: import.meta.env.VITE_API_BASE_URL_AUTH })
  }
  catch (error) {
    console.error(LOGOUT_ERROR_MESSAGE, error)
  }
  finally {
    authStore.logout()
    await redirectToLogin()
    // TODO: notification
  }
}

export { closeSession }
