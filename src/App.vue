<script setup lang="ts">
import { setToast } from './api/setup'

const toast = useToast()

setToast(toast)
</script>

<template>
  <NApp>
    <div class="main-container">
      <router-view />
      <ModalContainer />
    </div>
  </NApp>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  inline-size: min(92vi, 660px);
  min-height: 100svb;
  margin-inline: auto;
  padding-block: 4vi;
}
</style>
