<template>
  <aside class="sidebar-left">
    <div class="article-actions">
      <div class="article-actions-inner">
        <button v-for="(icon, index) in sideIcons" :key="index">
          <span class="icon"><component :is="icon" /></span>
          <span class="meta-count">{{ randomNum() }}</span>
        </button>
        <button>
          <span class="icon"> <DropDownIcon /></span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import HeartBig from '../icons/HeartBig.vue';
import UnicornIcon from '../icons/UnicornIcon.vue';
import BookmarkIcon from '../icons/BookmarkIcon.vue';
import DropDownIcon from '../icons/DropDownIcon.vue';

const sideIcons = [HeartBig, UnicornIcon, BookmarkIcon];
const randomNum = () => Math.floor(Math.random() * 50);
</script>

<style scoped>
.sidebar-left {
  /* border: 1px solid sandybrown; */
  /* display: grid; */
  display: block;
  gap: 1rem;
  justify-content: stretch;
}
.sidebar-left button {
  display: flex;
  flex-direction: column;
  border: none;
  background-color: transparent;
  align-items: center;
  font-family: inherit;
  color: #bdbdbd;
}
.article-actions {
  padding: 0;
  display: grid;
  gap: 1.5rem;
  position: sticky;

  justify-content: stretch;
  top: calc(56px + 1rem + 6vh);
}
.article-actions-inner {
  display: grid;
  gap: 1rem;
  justify-content: stretch;
}
.meta-count {
  font-size: 0.875rem;
  font-weight: normal;
}
.sidebar-left button .icon {
  padding: 0.5rem;
}
</style>
