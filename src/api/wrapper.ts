import type { KyInstance, Options } from 'ky'

import type { IApiWrapper, IRequestOptions } from './types'

import { removeUndefined } from '@/shared/utils/filterObjects'

/**
 * Wraps a Ky instance to provide a consistent interface for HTTP requests.
 * This wrapper simplifies the API calls by automatically handling JSON parsing
 * and mapping custom `IRequestOptions` to Ky's `Options`.
 *
 * @param {KyInstance} apiInstance - Pre-configured Ky instance.
 * @returns {IApiWrapper} An object containing semantic methods to perform requests:
 * - `get`: performs a GET request.
 * - `put`: performs a PUT request.
 * - `post`: performs a POST request.
 * - `del`: performs a DELETE request.
 * - `patch`: performs a PATCH request.
 *
 * @example
 * const api = createApiClientWrapper(ky.create({ baseUrl: '/api' }))
 *
 * const users = await api.get<Users>('users', { params: { page: 9 } })
 * const user = await api.get<User>('users/5')
 */
export const createApiWrapper = (apiInstance: KyInstance): IApiWrapper => {
  const callApi = async <T = unknown>(url: string, options: Options): Promise<T> => {
    const data = await apiInstance(url, options)

    return await data.json<T>()
  }

  const createHttpMethod = (method: string) => {
    return <T = unknown>(url: string, options: IRequestOptions = {}): Promise<T> => {
      const requestOptions: Options = {
        method,
        json: options.payload,
        headers: options.headers,
        searchParams: options.params,
      }

      const cleanRequestOptions: Options = removeUndefined<Options>(requestOptions)

      return callApi<T>(url, cleanRequestOptions)
    }
  }

  return {
    patch: createHttpMethod('patch'),
    del: createHttpMethod('delete'),
    post: createHttpMethod('post'),
    put: createHttpMethod('put'),
    get: createHttpMethod('get'),
  }
}
