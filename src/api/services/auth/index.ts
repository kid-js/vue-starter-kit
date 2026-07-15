// import { authApiWrapper } from '@/api'

import type { IDefaultApiResponse } from '@/api/types'
import type { ITokens, ILoginPayload } from './types'

// const { post } = authApiWrapper

export const Auth = {
  login(payload: ILoginPayload): Promise<ITokens> {
    // return post('/auth-with-password', { payload })

    if (payload.email === 'bateman@dc.com' && payload.password === 'bateman!90KYA') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            access_token: 'access_token_89099056090',
            refresh_token: 'refresh_token_59906606889050',
          })
        }, 265)
      })
    }

    return new Promise((_resolve, reject) => reject(new Error('Invalid credentials')))
  },

  logout(): Promise<IDefaultApiResponse> {
    // return post(`/logout`)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true })
      }, 0)
    })
  },

  refresh(refreshToken: string): Promise<ITokens> {
    // return post(`/refresh`, { refresh_token: refreshToken })
    console.warn(refreshToken)

    return new Promise(resolve => resolve({
      access_token: 'access_token_89099056090',
      refresh_token: 'refresh_token_59906606889050',
    }))
  },
}
