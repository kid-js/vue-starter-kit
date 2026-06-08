import ky from 'ky'

import { useAuthStore } from '@/stores'

import type { ITokens } from '@/api/services/auth/types'

const refreshSession = async (): Promise<void> => {
  const authStore = useAuthStore()

  const tokens: ITokens = await ky.post('/refresh', {
    prefix: import.meta.env.VITE_API_BASE_URL_AUTH,
    json: {
      refresh_token: authStore.refreshToken,
    },
  }).json<ITokens>()

  if (tokens?.access_token) {
    authStore.login(tokens) // set tokens and update actual auth state
  }
}

export { refreshSession }
