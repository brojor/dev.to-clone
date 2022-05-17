<template>
  <div class="comment-form-toolbox">
    <div class="image-upload">
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFileUpload"
      />
      <button @click="fileInput?.click()">
        <CommentImageUpload />
        <span> Upload image</span>
      </button>
    </div>
    <button type="button">
      <CommentTemplates />
      Templates
    </button>
    <a href=""><CommentInfo /></a>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import CommentImageUpload from './icons/comment/CommentImageUpload.vue';
import CommentTemplates from './icons/comment/CommentTemplates.vue';
import CommentInfo from './icons/comment/CommentInfo.vue';

const handleFileUpload = () => {
  // upload file
};

const fileInput = ref<HTMLElement | null>(null);
</script>

<style scoped lang="scss">
.comment-form-toolbox {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-top: 1px solid #3d3d3d;
  background: var(--form-bg);
  border-radius: 0 0 0.375rem 0.375rem;
  font-size: 0.875rem;
}
input {
  display: none;
}
button {
  transition: all cubic-bezier(0.17, 0.67, 0.5, 0.71) 200ms;
  background: none;
  outline: none;
  border: none;
  color: aliceblue;
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  display: inline-block;
  padding-left: 0.5rem;
  background: var(--button-ghost-bg);
  color: var(--button-ghost-dimmed-color);
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-family: inherit;
  &:hover {
    background: var(--button-ghost-bg-hover);
    color: var(--button-ghost-dimmed-color-hover);
  }
  svg {
    margin-right: 0.25rem;
  }
}
a {
  transition: all cubic-bezier(0.17, 0.67, 0.5, 0.71) 200ms;
  margin-left: auto;
  padding: 0 0.25rem;
  color: var(--button-ghost-dimmed-color);
  &:hover {
    color: var(--button-ghost-dimmed-color-hover);
  }
}
</style>
