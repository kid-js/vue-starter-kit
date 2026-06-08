import ky from 'ky'
import type { KyInstance, Options } from 'ky'

export const createApiInstance = (options: Options): KyInstance => {
  const instance: KyInstance = ky.create({
    ...options,
  })

  return instance
}
