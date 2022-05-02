<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import MainArticle from '../components/MainArticle.vue';
import { useRoute } from 'vue-router';
import SideBarLeft from '../components/postView/SideBarLeft.vue';
import SideBarRight from '../components/postView/SideBarRight.vue';
import ArticleDiscussion from '../components/ArticleDiscussion.vue';

export interface Post {
  id: number;
  title: string;
  image: string;
  user_id: number;
  body: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags?: TagsEntity[] | null;
  author: Author;
  meta: Meta;
}
export interface TagsEntity {
  name: string;
}
export interface Author {
  id: number;
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  summary: string;
  location: string;
  website_url: string;
  profile_image: string;
  joined_at?: null;
  updated_at: string;
}
export interface Meta {
  comments_count: number;
}

const post = ref<Post>();
const user = ref<Author>();

const {
  params: { username, slug },
} = useRoute();

onMounted(async () => {
  const { data: postData } = await axios.get(
    `http://localhost:3333/${username}/${slug}`
  );
  post.value = postData;
  const { data: authorData } = await axios.get(
    `http://localhost:3333/${username}`
  );
  user.value = authorData;
});
</script>

<template>
  <div class="index-container">
    <SideBarLeft />
    <!-- <MainArticle v-if="post" v-bind="post" /> -->
    <ArticleDiscussion />
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
