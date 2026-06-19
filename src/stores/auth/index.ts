import type { ITokens } from '@/api/services/auth/types'
import type { IUserData } from '@/pages/user/types'

import { HAS_SESSION_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants'

const useAuthPrivateStore = defineStore('auth-private', () => {
  // private state
  const _isAuth: Ref<boolean> = ref(false)
  const _user: Ref<IUserData | null> = ref(null)
  const _accessToken: Ref<string | null> = ref(null)
  const _hasSession: Ref<string | null> = ref(localStorage.getItem(HAS_SESSION_KEY))
  const _refreshToken: Ref<string | null> = ref(localStorage.getItem(REFRESH_TOKEN_KEY))

  return {
    _refreshToken,
    _accessToken,
    _hasSession,
    _isAuth,
    _user,
  }
})

export const useAuthStore = defineStore('auth', () => {
  const authPrivateStore = useAuthPrivateStore()
  const { _isAuth, _user, _accessToken, _hasSession, _refreshToken } = storeToRefs(authPrivateStore)

  // getters
  const refreshToken: ComputedRef<string | null> = computed(() => _refreshToken.value)
  const accessToken: ComputedRef<string | null> = computed(() => _accessToken.value)
  const hasSession: ComputedRef<string | null> = computed(() => _hasSession.value)
  const user: ComputedRef<IUserData | null> = computed(() => _user.value)
  const isAuth: ComputedRef<boolean> = computed(() => _isAuth.value)

  // actions
  const checkAuth = (): void => {
    _isAuth.value = !!_accessToken.value
  }

  const login = (tokens: ITokens): void => {
    setTokens(tokens)
    checkAuth()
  }

  const logout = (): void => {
    _isAuth.value = false
    _user.value = null
    removeTokens()
  }

  const removeTokens = (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(HAS_SESSION_KEY)
    _refreshToken.value = null
    _accessToken.value = null
    _hasSession.value = null
  }

  const setTokens = (tokens: ITokens): void => {
    /*
    * In production mode, refresh token must be stored in a more secure place!
    */
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token)
    localStorage.setItem(HAS_SESSION_KEY, 'true')
    _refreshToken.value = tokens.refresh_token
    _accessToken.value = tokens.access_token
    _hasSession.value = 'true'
  }

  const setUser = (userData: IUserData): void => {
    _user.value = userData
  }

  return {
    setTokens,
    refreshToken,
    accessToken,
    hasSession,
    checkAuth,
    setUser,
    isAuth,
    logout,
    login,
    user,
  }
})
