import type { Component } from 'vue'

import MConfirmAction from './confirm-action/MConfirmAction.vue'

import type { TModalType } from './types'

export const MODAL_REGISTRY: Record<TModalType, Component> = {
  CONFIRM_ACTION: MConfirmAction,
}
