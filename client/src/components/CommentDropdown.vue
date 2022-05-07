<template>
  <div class="comment-dropdown-inner" v-if="props.isOpen" ref="commentDropdown">
    <ul class="ul">
      <li v-for="(item, index) in items" :key="index">
        <a :href="item.href" @click="item.action">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { openedDropdown } from '@/stores/openedDropdown';

const commentDropdown = ref(null);

onClickOutside(commentDropdown, (event) => {
  const { path } = event;
  if (path.some((item) => item.name === 'toggle-dropdown')) {
    return;
  }
  openedDropdown.value = null;
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['delete']);

const deleteItem = (item) => {
  emit('delete', item);
  openedDropdown.value = null;
};

const items = [
  {
    text: 'Copy link',
  },
  {
    text: 'Settings',
  },
  {
    text: 'Report abuse',
  },
  {
    text: 'Edit',
    href: '/ben/what-jobs-exist-in-it-m0e/comments/1o7ki/edit',
  },
  {
    text: 'Delete',
    // href: '/ben/what-jobs-exist-in-it-m0e/comments/1o7ki/delete_confirm',
    action: deleteItem,
  },
];
</script>

<style scoped>
.comment-dropdown-inner {
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.25) 0px 4px 6px -2px,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  margin-left: auto;
  max-width: 360px;
  width: max-content;
  position: absolute;
  top: 100%;
  padding: 0.5rem;
  min-width: 250px;
  margin-top: 0.25rem;
  z-index: 1;
  background: var(--card-bg);
  color: var(--card-color);
  border-radius: 0.375rem;
}
li {
  font-size: 1rem;
}
a {
  padding: 0.5rem;
  color: var(--link-color);
  text-decoration: none;
  display: flex;
  align-items: center;
}
</style>
