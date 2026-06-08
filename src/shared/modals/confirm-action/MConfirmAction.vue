<script setup lang="ts">
import { MODAL_TYPE } from '../types'
import type { TModalItem } from '../types'

type Props = { modal: TModalItem<typeof MODAL_TYPE.CONFIRM_ACTION> }

const { modal } = defineProps<Props>()
</script>

<template>
  <UModal :modal>
    <template #title>
      <h1>{{ modal.data?.title || 'Confirm action' }}</h1>
    </template>

    <template #description>
      {{ modal.data?.description }}
    </template>

    <template #footer="{ onClose, onConfirm, isLoading }">
      <NButton variant="ghost" :disabled="isLoading" @click="onClose">
        {{ modal.data?.cancelText || 'Cancel' }}
      </NButton>
      <NButton :loading="isLoading" @click="onConfirm">
        {{ modal.data?.okText || 'Confirm' }}
      </NButton>
    </template>
  </UModal>
</template>
