<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="main-header"></header>
  <RouterView />
  <footer></footer>
</template>

<style>
@import '@/assets/base.css';
#app {
  width: 100vw;
}

.main-header {
  height: 56px;
  border: 1px solid red;
}

footer {
  border: 1px solid yellow;
  min-height: 5rem;
}
</style>
