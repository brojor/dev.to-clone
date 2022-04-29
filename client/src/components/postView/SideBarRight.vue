<template>
  <aside class="sidebar-right">
    <div class="wrapper">
      <div class="user-card">
        <div class="avatar-and-name">
          <a href="/username">
            <span class="avatar"
              ><img :src="user?.profile_image" alt="User avatr"
            /></span>
            <span class="name">{{ user?.name }}</span>
          </a>
        </div>
        <button class="follow">Follow</button>
        <p class="summary">{{ user?.summary }}</p>
        <ul class="user-meta-data">
          <li v-for="(value, key) in meta" :key="key">
            <div class="key">{{ key }}</div>
            <div class="value">{{ value }}</div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/runtime-core';
import axios from 'axios';

export interface Author {
  id: number;
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  summary: string;
  location: string;
  website_url: string;
  profile_image: string;
  joined_at?: null;
  updated_at: string;
}

const user = defineProps<Author>();

const meta = computed(() => {
  if (!user) return {};
  const metaKeys = ['work', 'location', 'joined_at', 'education'];
  return metaKeys.reduce((acc, key) => {
    if (user[key]) {
      acc[key] = user[key];
    }
    return acc;
  }, {} as Record<string, string>);
});
</script>

<style lang="scss">
.sidebar-right {
  .wrapper {
    position: sticky;
    top: 4.5rem;
  }
}
.user-card {
  border-top: 2rem solid;
  border-top-color: #cf3f78;
  display: grid;
  padding: 1rem;
  padding-top: 0;
  gap: 1rem;
  background: var(--card-secondary-bg);
  color: var(--card-secondary-color);
  box-shadow: 0 0 0 1px var(--card-secondary-border);
  border-radius: 6px;
  button {
    border: none;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    cursor: pointer;
    background-color: var(--button-primary-bg);
    color: var(--button-primary-color);
  }
  .summary {
    color: #bdbdbd;
    font-size: 1rem;
    line-height: 24px;
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li + li {
      margin-top: 0.75rem;
    }
    .key {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--card-color-tertiary);
    }
    .value {
      font-size: 1rem;
    }
  }
}

.avatar-and-name a {
  display: flex;
  text-decoration: none;

  color: var(--link-color);
  margin-top: -1rem;
  .avatar {
    margin-right: 0.5rem;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: inline-block;
    border-radius: 100%;
    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      display: inline-block;
      vertical-align: bottom;
    }
  }
  .name {
    margin-top: 1.25rem;
    color: var(--link-color);
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 700;
  }
}
</style>
