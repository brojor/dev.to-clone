<script setup lang="ts">
import PostComponent from '../components/PostComponent.vue';

import { onMounted, ref } from 'vue';
import axios from 'axios';

import MainNav from '../components/MainNav.vue';

const posts = ref<any>([]);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3333');
  posts.value = data;
});
</script>

<template>
  <div class="index-container">
    <aside class="sidebar-left">
      <MainNav />
    </aside>
    <main>
      <PostComponent
        v-for="post in posts"
        :key="post.id"
        v-bind="{
          title: post.title,
          publishedAt: post.published_at,
          tags: post.tags,
          slug: post.slug,
          author: post.author,
          meta: post.meta,
        }"
      />
    </main>
    <aside class="sidebar-right"></aside>
  </div>
</template>

<style scoped>
.index-container {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 15rem minmax(0, 2fr) 1fr;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 90vh;
}

main {
  flex-grow: 1;
}

.sidebar-left {
  /* border: 1px solid sandybrown; */
}

.sidebar-right {
  border: 1px solid sandybrown;
}
</style>
