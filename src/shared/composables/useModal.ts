import { nanoid } from 'nanoid'

import { useModalStore } from '@/stores'

import { MODAL_REGISTRY } from '@/shared/modals/registry'
import { MODAL_NOT_FOUND_MESSAGE } from '@/shared/constants'

import type { TModalOptions, TModalType } from '@/shared/modals/types'

interface IUseModal {
  showModal: <K extends TModalType>(options: TModalOptions<K>) => void
  removeModal: (modal: string) => void
  removeAllModals: () => void
}

export const useModal = (): IUseModal => {
  const modalStore = useModalStore()

  /**
   * @example
   * showModal({ key: MODAL_TYPE.CONFIRM_ACTION, data: { title: 'Remove?' } })
   */
  const showModal = <K extends TModalType>(options: TModalOptions<K>): void => {
    if (!MODAL_REGISTRY[options.key]) {
      console.error(`${options.key}: `, MODAL_NOT_FOUND_MESSAGE)
      return
    }

    if (options.config?.isSingle) {
      removeAllModals()
    }

    modalStore.add({
      ...options,
      id: nanoid(),
    })
  }

  const removeModal = (id: string): void => {
    modalStore.remove(id)
  }

  const removeAllModals = (): void => {
    modalStore.removeAll()
  }

  return {
    removeAllModals,
    removeModal,
    showModal,
  }
}
