<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <div class="main">
    <h1 class="main__title">
      Welcome back.
    </h1>
    <div v-if="authStore.isAuth && !authStore.user">
      <NSkeleton class="main__skeleton" />
    </div>
    <div v-else-if="authStore.isAuth" class="main__subtitle">
      You are logged in as {{ authStore.user?.name }}
    </div>
    <div v-else class="main__subtitle">
      You are not logged in 🤷‍♂️
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  &__subtitle {
    margin-top: 8px;
  }
  &__skeleton {
    margin-top: 12px;
    width: 200px;
    height: 18px;
  }
  &__form {
    margin-top: 36px;
    display: grid;
    gap: 16px;
    max-width: 360px;
  }
}
.check {
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
