<script setup lang="ts">
import type { TSize } from './types'

interface IProps {
  placeholder?: string
  type?: string
  size?: TSize
}

const {
  size = 'md',
  type = 'text',
  placeholder = '',
} = defineProps<IProps>()

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <NInput :type :placeholder :size v-model="model" />
</template>
