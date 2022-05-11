<template>
  <ul class="comments-tree">
    <li v-for="(comment, index) in comments" :key="index">
      <CommentNode :comment="comment" :index="index" />
      <CommentList
        v-if="comment.children.length"
        :comments="comment.children"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import CommentNode from './CommentNode.vue';

export interface Comment {
  id: number;
  body: string;
  post_id: number;
  user_id: number;
  created_at?: null;
  updated_at: string;
  author: Author;
  reply_to?: number;
  children: Comment[];
}
export interface Author {
  id: number;
  name: string;
  username: string;
  twitter_username?: null;
  github_username: string;
  summary?: null;
  location?: null;
  website_url?: null;
  profile_image: string;
  joined_at: string;
  updated_at: string;
}
const props = defineProps<{
  comments: Comment[];
}>();


const deleteComment = (id) => {
  console.log('DELETE komentář: ' + id);
};
</script>
