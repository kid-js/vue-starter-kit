// import { defaultApiWrapper } from '@/api'

import type { IUserData } from '@/pages/user/types'

// const { get } = defaultApiWrapper

export const Users = {
  getMe(): Promise<IUserData> {
    // return get('/users/me')

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: 'Patrick Bateman',
          email: 'bateman@dc.com',
        })
      }, 20)
    })
  },
}
