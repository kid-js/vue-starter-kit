import type { Ref } from 'vue'

import { schemas } from '@/validation/schemas'

import type { TSchema, TSchemaKey } from '@/validation/types'

interface TUseForm<K extends TSchemaKey> {
  state: Ref<TSchema<K>>
  schema: typeof schemas[K]
  reset: () => void
}

export const useForm = <K extends TSchemaKey>(
  formKey: K,
  initialState: TSchema<K>,
): TUseForm<K> => {
  const schema = schemas[formKey]
  const state = ref<TSchema<K>>({ ...initialState })

  const reset = (): void => {
    Object.assign(state.value, initialState)
  }

  return {
    schema,
    state,
    reset,
  }
}
