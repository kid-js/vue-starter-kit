export const MODAL_TYPE = {
  CONFIRM_ACTION: 'CONFIRM_ACTION',
} as const

export type TModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE]

export interface IModalConfig {
  isSingle?: boolean // if true, all other modals will be closed
  isDismissible?: boolean
  isScrollable?: boolean
  isFullscreen?: boolean
}

interface IModalOptionsMap extends Record<TModalType, unknown> {
  [MODAL_TYPE.CONFIRM_ACTION]: {
    data: {
      title?: string
      description?: string
      cancelText?: string
      okText?: string
    }
    handler: () => void | Promise<void>
  }
}

export type TModalOptions<K extends TModalType> = IModalOptionsMap[K] & {
  key: K
  config?: IModalConfig
  onClose?: () => void | Promise<void>
}

export type TModalItem<K extends TModalType> = TModalOptions<K> & {
  id: string
}
