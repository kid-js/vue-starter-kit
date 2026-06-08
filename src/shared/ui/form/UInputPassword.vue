<script setup lang="ts">
import type { TSize } from './types'

interface IProps {
  placeholder?: string
  size?: TSize
}

const {
  size = 'md',
  placeholder = '',
} = defineProps<IProps>()

const model = defineModel({ type: String, required: true })

const show = ref<boolean>(false)
</script>

<template>
  <NInput
    v-model="model"
    :placeholder
    :type="show ? 'text' : 'password'"
    :size
  >
    <template #trailing>
      <NButton
        size="sm"
        variant="link"
        color="neutral"
        aria-controls="password"
        :icon="show ? 'i-lucide:eye-closed' : 'i-lucide:eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        @click="show = !show"
      />
    </template>
  </NInput>
</template>
