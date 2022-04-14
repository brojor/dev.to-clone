<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<template>
  <aside class="sidebar-left"></aside>
  <main><h1></h1></main>
  <aside class="sidebar-right"></aside>
</template>

<style scoped>
main {
  border: 1px solid rgb(4, 190, 4);
  margin: 0 1rem 0 1rem;
  flex-grow: 1;
}

.sidebar-left {
  width: 4rem;
  border: 1px solid sandybrown;
}

.sidebar-right {
  width: 345px;
  border: 1px solid sandybrown;
}
</style>
