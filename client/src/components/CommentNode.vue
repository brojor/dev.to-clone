<template>
  <details :open="isOpen" @click.prevent>
    <summary @click="toggleDetails">
      <span>
        <DetailsCollapseIcon v-if="isOpen" />
        <DetailExpandIcon v-else />
      </span>
      <span v-if="!isOpen && !comment.is_archived"
        >{{ comment.author.name }} {{ numOfResponses }}</span
      >
      <!-- <span> {{ numOfResponses }}</span> -->
      <span v-if="!isOpen && comment.is_archived">Comment deleted</span>
    </summary>
    <div class="comment-node">
      <div class="comment-inner">
        <a href="" class="avatar">
          <img
            v-if="!comment.is_archived"
            :src="comment.author.profile_image"
            alt=""
          />
          <img v-else :src="anonymousUser.profile_image" alt="" />
        </a>
        <div class="comment-details">
          <div v-if="!comment.is_archived" class="comment-content">
            <div class="comment-header">
              <div class="user-name">{{ comment.author.name }}</div>
              <span class="delimiter">•</span>
              <div class="creation-date">{{ comment['created_at'] }}</div>
              <div class="comment-dropdown">
                <button name="toggle-dropdown">
                  <DropdownDots @click="toggleDropdown" />
                </button>
                <CommentDropdown
                  :isOpen="openedDropdown === props.comment.id"
                  @delete="deleteComment(comment.id)"
                />
              </div>
            </div>
            <div class="comment-body" v-html="comment.body"></div>
          </div>
          <div v-else class="comment-content">
            <p class="comment-deleted">Comment deleted</p>
          </div>
          <CommentForm v-if="openToReply" @submit="addReply" />
          <footer
            v-if="!openToReply && !comment.is_archived"
            class="comment-footer"
          >
            <button :class="{ isActive: likedByUser }">
              <CommentHeartIcon :isActive="likedByUser" />
              <span>{{ reactionsCount }}&nbsp;likes</span>
            </button>
            <button @click="handleReply">
              <CommentReplyIcon />
              <span>Reply</span>
            </button>
          </footer>
        </div>
      </div>
      <CommentNode
        v-for="(comment, index) in comment.responses"
        :key="index"
        :comment="comment"
        :index="index"
        @delete="$emit('delete', $event)"
        @change="$emit('change')"
      />
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
import CommentForm from './CommentForm.vue';

import { openedDropdown } from '@/stores/openedDropdown';
import { computed } from '@vue/runtime-core';
import axios from 'axios';

const userId = 1;

const anonymousUser = {
  profile_image:
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y',
};

const props = defineProps({
  comment: {
    type: Object,
  },
  index: {
    type: Number,
  },
});

const emit = defineEmits(['delete', 'change']);

const paddingLeft = computed(() => {
  return `${props.comment.level_index * 1.75}rem`;
});

const isOpen = ref(true);
const openToReply = ref(false);

const handleReply = () => {
  console.log('otevírám');
  openToReply.value = true;
};

const addReply = async (text) => {
  const { status } = await axios.post('http://127.0.0.1:3333/comments', {
    bodyMarkdown: text,
    postId: 1,
    replyTo: props.comment.id,
  });
  if (status === 201) {
    emit('change');
    openToReply.value = false;
  }
};

const toggleDropdown = () => {
  console.log('toggleDropdown');
  if (openedDropdown.value == props.comment.id) {
    openedDropdown.value = null;
  } else {
    openedDropdown.value = props.comment.id;
  }
};

const toggleDetails = () => {
  isOpen.value = !isOpen.value;
};

const deleteComment = (id) => {
  emit('delete', id);
};

const allResponses = (responses, arr = []) => {
  for (const response of responses) {
    arr.push(response.id);
    if (response.responses.length) {
      arr.push(...allResponses(response.responses));
    }
  }
  return arr;
};

const numOfResponses = computed(() => {
  const responses = allResponses(props.comment.responses);
  return responses.length ? `+ ${responses.length} replies` : '';
});

const reactionsCount = computed(() => {
  return props.comment.reactions.length;
});

const likedByUser = computed(() => {
  return props.comment.reactions.some(
    (reaction) => reaction.user_id === userId
  );
});
</script>

<style scoped>
details {
  padding-left: v-bind(paddingLeft);
}
.comment-deleted {
  padding: 1.5rem;
  text-align: center;
  opacity: 50%;
  font-size: 0.875rem;
  margin-bottom: 0;
}
</style>
