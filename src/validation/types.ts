import type { InferOutput } from 'valibot'
import { schemas } from './schemas'

export const FORMS = {
  LOGIN: 'login',
} as const satisfies Record<string, keyof typeof schemas>

export type TSchemaKey = keyof typeof schemas
export type TSchema<K extends TSchemaKey> = InferOutput<typeof schemas[K]>
