<script setup lang="ts">
import type { TSize } from './types'

interface IProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  loading?: boolean
  label?: string
  size?: TSize
}

const {
  label = '',
  size = 'md',
  loading = false,
  type = undefined,
} = defineProps<IProps>()

const emits = defineEmits(['on-click'])
</script>

<template>
  <NButton :type :loading :label :size @click="emits('on-click')" />
</template>
