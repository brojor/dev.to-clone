<template>
  <ul class="comments-tree">
    <li v-for="(comment, index) in comments" :key="index">
      <CommentNode
        :comment="comment"
        :index="index"
        @delete="$emit('deleteComment', $event)"
        @change="$emit('change')"
      />
      <CommentList
        v-if="comment.responses.length"
        :comments="comment.responses"
        @change="$emit('change')"
        @delete-comment="$emit('deleteComment', $event)"
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

const emit = defineEmits(['deleteComment', 'change']);

// const deleteComment = (id) => {
//   console.log('DELETE komentář: ' + id);
// };
</script>
