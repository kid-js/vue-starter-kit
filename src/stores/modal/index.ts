import type { TModalItem, TModalType } from '@/shared/modals/types'

export const useModalStore = defineStore('modals', () => {
  // state
  const _modals = ref<TModalItem<TModalType>[]>([])

  // getters
  const modals = computed(() => _modals.value)

  // actions
  const add = (modal: TModalItem<TModalType>): void => {
    _modals.value.push(modal)
  }

  const remove = (id: string): void => {
    _modals.value = _modals.value.filter(modal => modal.id !== id)
  }

  const removeAll = (): void => {
    _modals.value = []
  }

  return {
    removeAll,
    remove,
    modals,
    add,
  }
})
