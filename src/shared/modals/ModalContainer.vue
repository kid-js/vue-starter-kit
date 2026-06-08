<script setup lang="ts">
import type { Component } from 'vue'

import { useModalStore } from '@/stores'
import { MODAL_REGISTRY } from './registry'

import type { TModalType } from './types'

const modalStore = useModalStore()

const getModalComponent = (key: TModalType): Component => {
  return MODAL_REGISTRY[key]
}
</script>

<template>
  <template v-if="modalStore.modals.length > 0">
    <component
      :is="getModalComponent(modal.key)"
      v-for="modal in modalStore.modals"
      :modal
      :key="modal.id"
    />
  </template>
</template>
