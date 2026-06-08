<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

import { useAuthStore } from '@/stores'
import { useAuth } from '@/shared/composables'

import { PATH_AUTH, PATH_DEFAULT, PATH_USER } from '@/shared/constants'

const router = useRouter()
const authStore = useAuthStore()
const { logout, isAuthLoading } = useAuth()

const mainMenu = ref<NavigationMenuItem[]>([
  {
    label: 'Main',
    to: PATH_DEFAULT,
  },
])

const userMenu = computed((): NavigationMenuItem[] => {
  return [
    {
      label: 'Profile',
      to: PATH_USER,
    },
    {
      disabled: isAuthLoading.value,
      label: authStore.isAuth ? 'Logout' : 'Login',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSelect: async (): Promise<void> => {
        await (authStore.isAuth ? logout() : router.push(PATH_AUTH))
      },
    },
  ]
})
</script>

<template>
  <div class="nav">
    <NNavigationMenu :items="mainMenu" />
    <NNavigationMenu :items="userMenu" />
  </div>
</template>

<style lang="scss" scoped>
.nav {
  @include flex-between;
}
</style>
