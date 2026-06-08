import 'vue-router'
import type { VNode } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // extends RouteMeta with custom properties
    isMenu?: boolean // is menu item or not
    icon?: VNode | (() => VNode) // icon for menu item
    needsAuth: boolean // is auth required or not
    pageName?: string // page name (anchor text)
  }

  type TMenuRoute = RouteRecordRaw & {
    // type for menu item with optional nested items
    children?: TMenuRoute[]
    meta?: RouteMeta
  }
}
