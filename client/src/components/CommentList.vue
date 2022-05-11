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

import type { Comment } from '../interfaces';

const props = defineProps<{
  comments: Comment[];
}>();

const deleteComment = (id) => {
  console.log('DELETE komentář: ' + id);
};
</script>
