import { object } from 'valibot'
import { rules } from './rules'

export const schemas = {
  login: object({
    email: rules.email,
    password: rules.password,
  }),
} as const
