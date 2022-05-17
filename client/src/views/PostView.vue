<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MainArticle from '../components/MainArticle.vue';
import { useRoute } from 'vue-router';
import SideBarLeft from '../components/postView/SideBarLeft.vue';
import SideBarRight from '../components/postView/SideBarRight.vue';
import type { Post, Author, Comment } from '../interfaces';
import axios from 'axios';

const user = ref<Author>();

const username = 'pb';

onMounted(async () => {
  const { data: authorData } = await axios.get(
    `http://localhost:3333/${username}`
  );
  user.value = authorData;
});
</script>

<template>
  <div class="index-container">
    <SideBarLeft />
    <MainArticle />
    <SideBarRight v-if="user" v-bind="user" />
  </div>
</template>

<style scoped>
.index-container {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 4rem minmax(0, 7fr) 3fr;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 90vh;
}
</style>
