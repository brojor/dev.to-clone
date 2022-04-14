<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header></header>
  <div class="app-container">
    <RouterView />
  </div>
  <footer></footer>
</template>

<style>
@import '@/assets/base.css';
header {
  height: 56px;
  border: 1px solid red;
}

.app-container {
  display: flex;
  margin: 0 50px 0 50px;
  padding: 1rem;
  min-height: 90vh;
}

footer {
  border: 1px solid yellow;
  min-height: 5rem;
}
</style>
