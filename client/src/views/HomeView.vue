<script setup lang="ts">
import PostComponent from '../components/PostComponent.vue';

import { onMounted, ref } from 'vue';
import axios from 'axios';

const posts = ref<any>([]);

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3333');
  posts.value = data;
});

// const posts = ref([
//   {
//     id: 1,
//     title: 'Hello, World!',
//     user: {
//       name: 'phongdang707',
//       avatar:
//         'https://res.cloudinary.com/practicaldev/image/fetch/s--zqc1Dc7d--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/381638/ebbbc99b-48a6-4dd6-ba3c-90698d3b9a38.jpg',
//     },
//     publishDate: new Date('2022/04/15'),
//     tags: ['discuss', 'help'],
//   },
//   {
//     id: 2,
//     title: 'Landing page',
//     user: {
//       name: 'Umar Deepanshu',
//       avatar:
//         'https://res.cloudinary.com/practicaldev/image/fetch/s--1oN03ZGR--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/547736/36cfad3b-d1ea-4da8-bfcb-edb46455a374.jpeg',
//     },
//     publishDate: new Date('2022/04/16'),
//     tags: ['javascript', 'nextjs', 'webdev'],
//   },
// ]);
</script>

<template>
  <div class="index-container">
    <aside class="sidebar-left"></aside>
    <main>
      <PostComponent v-for="post in posts" :key="post.id" v-bind="post" />
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
  border: 1px solid sandybrown;
}

.sidebar-right {
  border: 1px solid sandybrown;
}
</style>
