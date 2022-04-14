<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<template>
  <aside class="sidebar-left"></aside>
  <main></main>
  <aside class="sidebar-right"></aside>
</template>

<style scoped>
main {
  border: 1px solid rgb(4, 190, 4);
  flex-grow: 1;
}

.sidebar-left {
  width: 240px;
  border: 1px solid sandybrown;
}

.sidebar-right {
  width: 325px;
  border: 1px solid sandybrown;
}
</style>
