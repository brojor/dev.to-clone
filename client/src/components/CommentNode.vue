<template>
  <details :open="isOpen" @click.prevent>
    <summary @click="handleClick">
      <span>
        <DetailsCollapseIcon v-if="isOpen" />
        <DetailExpandIcon v-else />
      </span>
      <span v-if="!isOpen">{{ comment.author.name }}</span>
    </summary>
    <div class="comment-inner">
      <a href="" class="avatar">
        <img :src="comment.author.profile_image" alt="" />
      </a>
      <div class="comment-details">
        <div class="comment-content">
          <div class="comment-header">
            <div class="user-name">{{ comment.author.name }}</div>
            <span class="delimiter">•</span>
            <div class="creation-date">{{ comment['created_at'] }}</div>
            <div class="comment-dropdown">
              <button name="toggle-dropdown">
                <DropdownDots @click="toggleDropdown" />
              </button>
              <CommentDropdown
                :isOpen="openedDropdown === props.index"
                @delete="deleteComment"
              />
            </div>
          </div>
          <div class="comment-body" v-html="comment.body"></div>
        </div>
        <footer class="comment-footer">
          <button>
            <CommentHeartIcon :isActive="true" />
            <span>8&nbsp;likes</span>
          </button>
          <button>
            <CommentReplyIcon />
            <span>Reply</span>
          </button>
        </footer>
      </div>
    </div>
  </details>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import DetailExpandIcon from './icons/reactions/DetailExpandIcon.vue';
import DetailsCollapseIcon from './icons/reactions/DetailsCollapseIcon.vue';
import DropdownDots from './icons/comment/DropdownDots.vue';
import CommentHeartIcon from './icons/comment/CommentHeartIcon.vue';
import CommentReplyIcon from './icons/comment/CommentReplyIcon.vue';
import CommentDropdown from './CommentDropdown.vue';

import { openedDropdown } from '@/stores/openedDropdown';

const props = defineProps({
  comment: {
    type: Object,
  },
  index: {
    type: Number,
  },
});

const isOpen = ref(true);

const toggleDropdown = () => {
  console.log('toggleDropdown');
  if (openedDropdown.value == props.index) {
    openedDropdown.value = null;
  } else {
    openedDropdown.value = props.index;
  }
};

const emit = defineEmits(['delete']);

const deleteComment = () => {
  emit('delete', props.comment.id);
};
</script>

<style></style>
