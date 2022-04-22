<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import MainHeader from './components/MainHeader.vue';
</script>

<template>
  <MainHeader />
  <RouterView class="main-view" />
  <footer></footer>
</template>

<style>
@import '@/assets/base.css';

#app {
  width: 100vw;
  padding-top: 56px;
}
.main-view {
  margin-top: 6rem;
}

footer {
  border: 1px solid yellow;
  min-height: 5rem;
}
</style>
