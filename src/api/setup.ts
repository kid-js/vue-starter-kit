import type { Router } from 'vue-router'
import type { KyInstance, Options } from 'ky'

import { ROUTER_GETTER_ERROR_MESSAGE } from '@/shared/constants'

import { createApiHooks } from './interceptors'
import { createApiInstance } from './instance'
import { createApiWrapper } from './wrapper'

import type { IApiWrapper } from './types'

type Toast = ReturnType<typeof useToast>

let _router: Router
let _toast: Toast

/**
 * The helper is used to access the router without importing it directly, which
 * prevents circular dependency issues while using it inside API interceptors.
 *
 * @throws {Error} If the router has not been injected via `setRouter()`.
 * @returns {Router} The initialized Router instance.
 */
const getRouter = (): Router => {
  if (!_router) {
    try {
      throw new Error(ROUTER_GETTER_ERROR_MESSAGE)
    }
    catch (error) {
      console.error(error)
    }
  }
  return _router
}

/**
 * This helper provides access to contextual toast instance inside API interceptors
 * initiated outside the app context, which is required for toasts to work correctly.
 *
 * The in-context toast instance is being set in the `App.vue` component.
 *
 * @returns {Toast} The current toast instance or an out-of-context fallback.
 */
const getToast = (): Toast => {
  if (!_toast) {
    // still, we can use toast out of the app context
    // it will work, but may lead to unexpected toasts behavior
    return useToast()
  }
  return _toast
}

const setRouter = (router: Router): void => {
  _router ??= router // sets the router only once
}

const setToast = (toast: Toast): void => {
  _toast ??= toast // sets the toast only once
}

const { beforeRequestHook, afterResponseHook, beforeErrorHook } = createApiHooks()

const defaultHooks = {
  beforeRequest: [beforeRequestHook],
  afterResponse: [afterResponseHook],
  beforeError: [beforeErrorHook],
}

const defaultOptions: Options = {
  prefix: import.meta.env.VITE_API_BASE_URL,
  timeout: 9600,
  retry: {
    limit: 2,
    retryOnTimeout: true,
    methods: ['get', 'head'],
  },
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: defaultHooks,
}

const defaultApiInstance: KyInstance = createApiInstance(defaultOptions)
const authApiInstance: KyInstance = createApiInstance({
  ...defaultOptions,
  prefix: import.meta.env.VITE_API_BASE_URL_AUTH,
  context: { isAuthRequest: true },
})

const defaultApiWrapper: IApiWrapper = createApiWrapper(defaultApiInstance)
const authApiWrapper: IApiWrapper = createApiWrapper(authApiInstance)

export {
  defaultApiWrapper,
  authApiWrapper,
  getRouter,
  setRouter,
  getToast,
  setToast,
}
