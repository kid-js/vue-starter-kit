<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <div class="user-profile">
    <h1 class="user-profile__title">
      User Profile
    </h1>
    <div v-if="authStore.user" class="user-profile__info">
      <span>Email: {{ authStore.user.email }}</span>
      <span>Name: {{ authStore.user.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-profile {
  &__info {
    display: grid;
    margin-top: 8px;
  }
}
</style>
