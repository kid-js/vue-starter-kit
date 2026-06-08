<script setup lang="ts">

</script>

<template>
  <div class="layout-main">
    <UNav />
    <div class="layout-main__content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-main {
  &__content {
    margin-top: 36px;
  }
}
</style>
