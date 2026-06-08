<script setup lang="ts">
import { useModal } from '@/shared/composables'

import type { TModalItem, TModalType } from '@/shared/modals/types'

type THandleConfirm = (callback?: () => void | Promise<void>) => Promise<void>
type TProps = { modal: TModalItem<TModalType> }

const { modal } = defineProps<TProps>()
const slots = defineSlots() // TODO: add types

const isOpen: Ref<boolean> = ref(true)
const isConfirmed: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(false)

const { removeModal } = useModal()

const handleConfirm: THandleConfirm = async (callback) => {
  isLoading.value = true
  isConfirmed.value = true

  try {
    const handler = typeof callback === 'function' ? callback : modal.handler

    await handler?.()

    isOpen.value = false
  }
  finally {
    isConfirmed.value = false
    isLoading.value = false
  }
}

const handleVisibility = async (): Promise<void> => {
  if (!isOpen.value && !isConfirmed.value) {
    await modal.onClose?.()
  }
}

const handleClose = (): void => {
  // this handler is called when modal is closed and animation is finished
  removeModal(modal.id)
}
</script>

<template>
  <NModal
    v-model:open="isOpen"
    :scrollable="modal.config?.isScrollable || false"
    :dismissible="modal.config?.isDismissible || !isLoading"
    :fullscreen="modal.config?.isFullscreen || false"
    :close="{ disabled: isLoading }"
    :ui="{ footer: 'justify-end' }"
    @update:open="handleVisibility"
    @after:leave="handleClose"
  >
    <template v-if="slots.body" #body>
      <slot name="body" />
    </template>

    <template v-if="slots.header" #header>
      <slot name="header" />
    </template>

    <template v-if="slots.title" #title>
      <slot name="title">
        {{ modal.data?.title }}
      </slot>
    </template>

    <template v-if="slots.description" #description>
      <slot name="description">
        {{ modal.data?.description }}
      </slot>
    </template>

    <template #footer="{ close }">
      <slot
        name="footer"
        :is-loading="isLoading"
        :on-confirm="handleConfirm"
        :on-close="close"
      >
        <NButton :disabled="isLoading" @click="close">
          {{ modal.data?.okText || 'Ok' }}
        </NButton>
      </slot>
    </template>
  </NModal>
</template>
