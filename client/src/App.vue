<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { RouterLink, RouterView, useRoute } from "vue-router";
import MainHeader from "./components/MainHeader.vue";

const showHeader = computed(() => {
  const route = useRoute();

  return route.name !== "new";
});
</script>

<template>
  <MainHeader v-if="showHeader" />
  <RouterView class="main-view" />
  <footer class=""></footer>
</template>

<style>
@import "@/assets/base.css";

#app {
  width: 100vw;
  padding-top: 56px;
}
.main-view {
  margin-top: 6rem;
}

.main-footer {
  border: 1px solid yellow;
  min-height: 5rem;
}
</style>
