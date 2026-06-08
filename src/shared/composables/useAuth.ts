import type { Ref } from 'vue'

import { useAuthStore } from '@/stores'
import { Auth } from '@/api/services/auth'
import { Users } from '@/api/services/users'

import {
  RESTORE_SESSION_ERROR_MESSAGE,
  LOAD_USER_DATA_ERROR_MESSAGE,
  LOGOUT_ERROR_MESSAGE,
  PATH_DEFAULT,
} from '@/shared/constants'

import type { ITokens, ILoginPayload } from '@/api/services/auth/types'
import type { IUserData } from '@/pages/user/types'

type TRestoreSession = (options?: { isSilent?: boolean }) => Promise<boolean>
type TLogin = (payload: ILoginPayload) => Promise<void>

interface IUseAuth {
  logout: () => Promise<void>
  getUserData: () => Promise<void>
  restoreSession: TRestoreSession
  isAuthLoading: Ref<boolean>
  login: TLogin
}

// state shareable across components
const isAuthLoading: Ref<boolean> = ref(false)
const isSilentUpdate: Ref<boolean> = ref(false)
let _restorePromise: Promise<boolean> | null = null

export const useAuth = (): IUseAuth => {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  const login: TLogin = async (payload) => {
    isAuthLoading.value = true

    try {
      const tokens: ITokens = await Auth.login({ email: payload.email, password: payload.password })

      const nextPath = route.query.redirect // path to redirect after login

      if (tokens?.access_token) {
        authStore.login(tokens) // set tokens and update actual auth state
        void getUserData() // try to silently load user data on the background

        await router.push(typeof nextPath === 'string' ? nextPath : PATH_DEFAULT)
      }
    }
    catch (error) {
      console.error(error)
      // TODO: toast
    }
    finally {
      isAuthLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    isAuthLoading.value = true

    try {
      authStore.logout()
      await Auth.logout()
      await router.push(PATH_DEFAULT)
    }
    catch (error) {
      console.error(LOGOUT_ERROR_MESSAGE, error)
    }
    finally {
      isAuthLoading.value = false
    }
  }

  const getUserData = async (): Promise<void> => {
    isSilentUpdate.value = true

    try {
      const userData: IUserData = await Users.getMe()

      if (userData) {
        authStore.setUser(userData)
      }
    }
    catch (error) {
      console.error(LOAD_USER_DATA_ERROR_MESSAGE, error)
      // TODO: toast + logic
    }
    finally {
      isSilentUpdate.value = false
    }
  }

  /**
   * Restores user session in case if tab has been closed with no logging out.
   * @returns {boolean} `true` if session was successfully restored, `false` otherwise.
   */
  const restoreSession: TRestoreSession = async ({ isSilent = false } = {}) => {
    // cannot be restored if there is no refresh token or session did not exist
    if (!authStore.hasSession || !authStore.refreshToken) {
      return false
    }

    const refreshTokens = async (): Promise<boolean> => {
      const tokens = await Auth.refresh(authStore.refreshToken as string)

      if (tokens?.access_token) {
        authStore.login(tokens) // set tokens and update actual auth state

        void getUserData() // try to silently load user data on the background

        return authStore.isAuth
      }

      return false
    }

    // return ongoing promise to avoid multiple requests and race condition
    if (_restorePromise) {
      return _restorePromise.catch(() => false)
    }

    try {
      isSilentUpdate.value = isSilent

      _restorePromise = refreshTokens()

      return await _restorePromise
    }
    catch (error) {
      console.error(RESTORE_SESSION_ERROR_MESSAGE, error)

      authStore.logout()
      // TODO: toast

      return false
    }
    finally {
      _restorePromise = null
      isSilentUpdate.value = false
    }
  }

  return {
    restoreSession,
    isAuthLoading,
    getUserData,
    logout,
    login,
  }
}
