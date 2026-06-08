type TApiWrapperMethod = <T = unknown>(url: string, options?: IRequestOptions) => Promise<T>

export interface IDefaultApiResponse {
  ok: boolean
}

export interface IRequestOptions {
  params?: Record<string, string>
  payload?: Record<string, unknown>
  headers?: Record<string, string>
}

export interface IApiWrapper {
  patch: TApiWrapperMethod
  post: TApiWrapperMethod
  del: TApiWrapperMethod
  put: TApiWrapperMethod
  get: TApiWrapperMethod
}
