import ky, { isNetworkError, isHTTPError } from 'ky'
import type {
  BeforeRequestHook,
  AfterResponseHook,
  BeforeErrorHook,
  KyRequest,
} from 'ky'

import { useAuthStore } from '@/stores'

import { refreshSession } from './utils/refreshSession'
import { closeSession } from './utils/closeSession'
import { getToast } from './setup'

type TCreateRetryRequest = (request: KyRequest, token: string) => {
  request: Request
  code: string
}

type ICreateApiHooks = () => {
  beforeRequestHook: BeforeRequestHook
  afterResponseHook: AfterResponseHook
  beforeErrorHook: BeforeErrorHook
}

interface IQueueItem {
  resolve: (token: string) => void
  reject: (error?: unknown) => void
}

export const createApiHooks: ICreateApiHooks = () => {
  let isRefreshing: boolean = false
  let failedQueue: IQueueItem[] = []

  const enqueue = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  const resolveQueue = (newToken: string): void => {
    failedQueue.forEach(({ resolve }) => resolve(newToken))
    failedQueue = []
  }

  const rejectQueue = (error?: unknown): void => {
    failedQueue.forEach(({ reject }) => reject(error))
    failedQueue = []
  }

  const getRetryRequestParams: TCreateRetryRequest = (request, token) => {
    const headers = new Headers(request.headers)
    headers.set('Authorization', `Bearer ${token}`)

    return {
      request: new Request(request, { headers }),
      code: 'TOKEN_REFRESHED',
    }
  }

  // default `beforeRequest` hook (interceptor)
  const beforeRequestHook: BeforeRequestHook = ({ request }) => {
    const { accessToken } = useAuthStore()

    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`)
    }
  }

  // default `afterResponse` hook
  const afterResponseHook: AfterResponseHook = async ({
    options,
    request,
    response,
    retryCount,
  }) => {
    const authStore = useAuthStore()

    if (response.status !== 401) {
      return // skip if status is not 401 Not Authorized Error
    }

    // only retry non-auth requests (login, logout, etc) and only once
    if (!authStore.refreshToken || retryCount > 0 || options.context?.isAuthRequest) {
      return closeSession()
    }

    if (isRefreshing) { // if there is a refresh ongoing, enqueue all other requests
      try {
        // create and enqueue a promise awaiting for new token
        const newToken = await enqueue()

        // if promise successfully resolved with new token, retry the request
        const requestParams = getRetryRequestParams(request, newToken)

        return ky.retry(requestParams)
      }
      catch {
        return response
      }
    }

    isRefreshing = true

    try {
      await refreshSession()

      if (!authStore.isAuth) { // one more guard in case if token was not saved
        rejectQueue()
        return closeSession()
      }

      // if session successfully refreshed, provide new token into the requests queue
      resolveQueue(authStore.accessToken as string)

      // and retry the very first request as well
      const requestParams = getRetryRequestParams(request, authStore.accessToken as string)

      return ky.retry(requestParams)
    }
    catch (error) {
      // if session refresh failed, reject all requests and redirect to login
      rejectQueue(error)
      return closeSession()
    }
    finally {
      isRefreshing = false
    }
  }

  // default `beforeErrorHook` hook
  const beforeErrorHook: BeforeErrorHook = ({ error }) => {
    const toast = getToast()

    if (isHTTPError(error)) {
      const status = error.response?.status

      if (status === 502 || status === 503) {
        toast.add({
          color: 'error',
          title: 'Server is temporarily unavailable',
          description: 'Try again or come back later',
        })
      }

      if (status === 500) {
        toast.add({
          color: 'error',
          title: 'Internal server error',
          description: 'Something went wrong. Try again later',
        })
      }
    }

    if (isNetworkError(error)) {
      toast.add({
        color: 'error',
        title: 'Network error',
        description: 'Please check your connection',
      })
    }

    return error
  }

  return {
    beforeRequestHook,
    afterResponseHook,
    beforeErrorHook,
  }
}
