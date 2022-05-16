<template>
  <div class="comments-tree">
    <CommentNode
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      :index="index"
      @delete="$emit('deleteComment', $event)"
      @change="$emit('change')"
    />
  </div>
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
