<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import MainArticle from '../components/MainArticle.vue';
import { useRoute } from 'vue-router';
import SideBarLeft from '../components/postView/SideBarLeft.vue';
import SideBarRight from '../components/postView/SideBarRight.vue';
import ArticleDiscussion from '../components/ArticleDiscussion.vue';

import type { Post, Author, Comment } from '../interfaces';

const post = ref<Post>();
const comments = ref<Comment[]>([]);
const user = ref<Author>();

const {
  params: { username, slug },
} = useRoute();

onMounted(async () => {
  const { data } = await axios.get(`http://localhost:3333/${username}/${slug}`);

  post.value = data.post;
  comments.value = data.comments;

  const { data: authorData } = await axios.get(
    `http://localhost:3333/${username}`
  );
  user.value = authorData;
});

const newComment = async () => {
  const postId = 1;
  const { data } = await axios.get(
    `http://localhost:3333/comments?postId=${postId}`
  );
  comments.value = data;
};
</script>

<template>
  <div class="index-container">
    <SideBarLeft />
    <!-- <MainArticle v-if="post" v-bind="post" /> -->
    <ArticleDiscussion :comments="comments" @new-comment="newComment" />
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
