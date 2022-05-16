<template>
  <section class="comments">
    <header>
      <h2>Discussion (10)</h2>
      <button class="subscribe">Subscribe</button>
    </header>
    <div class="comment-container">
      <CommentForm @submit="addNewComment" />
      <CommentList
        :comments="props.comments"
        @delete-comment="deleteComment($event)"
        @change="$emit('change')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

import type { Comment } from '../interfaces';

import axios from 'axios';

const props = defineProps<{
  comments: Comment[];
}>();

const emit = defineEmits(['change']);

const addNewComment = async (text: string) => {
  const { status } = await axios.post('http://127.0.0.1:3333/comments', {
    bodyMarkdown: text,
    postId: 1,
  });
  if (status === 201) {
    emit('change');
  }
};

const deleteComment = async (id) => {
  console.log('Mažu komentář: ' + id);
  const { status, data } = await axios.delete(
    `http://127.0.0.1:3333/comments?id=${id}`
  );
  if (status === 200) {
    console.log(data);
    console.log('Komentář byl smazán');
    emit('change');
  }
};
</script>

<style lang="scss">
details {
  position: relative;

  & > summary {
    z-index: 1;
    position: static;
    display: block;
    align-items: center;
    transform: initial;
    top: 0;
    left: var(--indent);
    cursor: pointer;
    font-size: 0.875rem;
    color: #a3a3a3;
    margin-bottom: 1rem;
    margin-left: var(--indent);
    padding: 0.25rem 0.5rem;
    font-style: italic;
    border-radius: 0.375rem;
    background: #090909;

    span {
      margin: 0 0.25rem;
      display: inline-block;
      vertical-align: middle;
      opacity: 0.5;
    }
  }
  &[open] > summary {
    position: absolute;
    top: 3rem;
    background: transparent;
    width: auto;
    padding: 0.25rem 0;
    margin-left: 0;
  }
  &[open]:hover {
    & > summary span {
      opacity: 1;
    }
    & .comment-dropdown button {
      opacity: 1 !important;
    }
  }
}
.comments-tree {
  .comment-inner {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    .avatar {
      margin-top: 0.75rem;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      background-color: var(--card-color-tertiary);
      img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
        display: inline-block;
        vertical-align: bottom;
      }
    }
    .comment-details {
      width: 100%;
      margin-left: 0.5rem;

      .comment-content {
        border-radius: 0.375rem;
        background: var(--card-bg);
        color: var(--card-color);
        box-shadow: 0 0 0 1px var(--card-border);
        overflow-wrap: anywhere;
        padding: 0.25rem;

        width: 100%;
      }

      .comment-header {
        padding: 0.5rem 0.75rem 0;
        display: flex;
        align-items: center;
        .user-name {
          font-weight: 500;
          padding: 0.25rem;
          padding-left: 0;
          color: var(--button-ghost-color);
          font-size: 1rem;
        }
        .delimiter {
          padding-right: 0.5rem;
          color: rgb(87, 87, 87);
        }
        .creation-date {
          font-size: 0.875rem;
          color: var(--link-color-secondary);
        }
        .comment-dropdown {
          margin-left: auto;
          margin-right: calc(-1 * 0.75rem);
          position: relative;
          top: calc(-1 * 0.5rem);
          button {
            cursor: pointer;
            background-color: transparent;
            border: none;
            color: var(--button-ghost-color);
            opacity: 0.5;
          }
        }
      }
      .comment-body {
        font-size: 1.125rem;
        overflow-wrap: break-word;
        padding: 0 0.75rem;
        margin: 0.5rem 0 1rem;
        p {
          margin: 0;
          font-size: inherit;
        }
      }
      .comment-footer {
        border: none;
        padding-top: 0.25rem;
        display: flex;
        align-items: center;
        button {
          display: inline-flex;
          padding: 4px 12px 4px 8px;
          background-color: transparent;
          border: none;
          color: #d6d6d7;
          margin-right: 0.25rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          cursor: pointer;
          &:hover {
            background-color: var(--button-ghost-bg-hover);
            color: var(--color-hover);
          }
          &.isActive {
            background-color: rgba(239, 68, 68, 0.1);
          }
          svg {
            margin-right: 0.25rem;
          }
          span {
            text-align: center;
            line-height: 1.5rem;
          }
        }
      }
    }
  }
}

.comments {
  background-color: rgb(23, 23, 23);
  padding: 2rem 4rem;
  margin-bottom: 1rem;
  border-top: 1px solid #242424;
  header {
    display: flex;
    margin-bottom: 1.5rem;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 1.5rem;
      color: #efefef;
      font-weight: 700;
      margin: 0;
    }
  }
  button.subscribe {
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5rem;
    cursor: pointer;
    border: 2px solid #3d3d3d;
    background: transparent;
    color: #d6d6d7;
    padding: calc(0.5rem - 1px) calc(1rem - 1px);
    font-family: inherit;
    font-weight: 500;
  }
}
.comment-container {
  .avatar {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: var(--card-color-tertiary);
    flex-shrink: 0;
    display: relative;

    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      display: inline-block;
      vertical-align: bottom;
    }
  }
}
</style>
