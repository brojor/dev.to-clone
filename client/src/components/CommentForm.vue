<template>
  <form @submit.prevent class="new-comment">
    <span class="avatar">
      <img
        src="https://res.cloudinary.com/practicaldev/image/fetch/s----BXFj9n--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/388717/c8a6ddef-627d-4fc3-ad73-3de02f122ae2.png"
        alt="avatar image"
      />
    </span>
    <div class="comment-form-inner">
      <div class="comment">
        <textarea
          placeholder="Add to the discussion"
          name="comment"
          v-model="text"
        ></textarea>
      </div>
      <div class="comment-buttons">
        <button @click="submitForm" type="submit" :disabled="text.length < 1">
          Submit
        </button>
        <button type="button" :disabled="text.length < 1">Preview</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import axios from 'axios';

const emit = defineEmits(['submit']);

const text = ref('');

const submitForm = () => {
  console.log('submituju');
  emit('submit', text.value);
  text.value = '';
};
</script>

<style scoped lang="scss">
.new-comment {
  display: flex;
  margin-bottom: 1rem;
  .comment-form-inner {
    width: 100%;
  }
  .comment-buttons {
    display: flex;
    margin-bottom: 1rem;
    button {
      margin-right: 0.5rem;
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 500;
      border: none;
      background-color: var(--button-secondary-bg);
      color: var(--button-secondary-color);
      cursor: pointer;
      &[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
      &:hover {
        background-color: var(--button-secondary-bg-hover);
        color: var(--button-secondary-color-hover);
      }
      &[type='submit'] {
        background-color: var(--button-primary-bg);
        color: var(--button-primary-color);
        &:hover {
          background-color: var(--button-primary-bg-hover);
          color: var(--button-primary-color-hover);
        }
      }
    }
  }
}

.comment {
  width: 100%;
  margin-bottom: 0.5rem;
  textarea {
    color: rgb(250, 250, 250);
    width: 100%;
    white-space: pre-wrap;
    padding: 0.5rem;
    border-radius: 0.375rem;
    background-color: rgb(0, 0, 0);
    font-size: 1rem;
    font-family: inherit;
    border: 1px solid rgb(64, 64, 64);
    line-height: 1.5;
    &::placeholder {
      color: rgb(82, 82, 82);
    }
  }
}
</style>
