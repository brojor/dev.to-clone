<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="main-header"></header>
  <div class="index-container">
    <RouterView />
  </div>
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

.index-container {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 4rem minmax(0, 7fr) 3fr;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 90vh;
}

footer {
  border: 1px solid yellow;
  min-height: 5rem;
}
</style>
