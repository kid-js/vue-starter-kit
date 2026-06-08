<script setup lang="ts">
import { PATH_DEFAULT } from '@/shared/constants'
</script>

<template>
  <div>
    404: Page Not Found
  </div>
  <div>
    <router-link :to="PATH_DEFAULT">Back home</router-link>
  </div>
</template>
