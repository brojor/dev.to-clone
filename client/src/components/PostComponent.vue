<template>
  <article @click="redirectMe">
    <div class="post">
      <div class="post-top">
        <div class="author-picture">
          <a href=""
            ><img
              class="avatar-image"
              :src="author.profile_image"
              alt="User avatar image"
          /></a>
        </div>
        <div>
          <div class="author-name">{{ author.name }}</div>
          <div class="publish-date">{{ date }}</div>
        </div>
      </div>
      <div class="post-bottom">
        <h3 class="title">{{ title }}</h3>
        <div class="tags">
          <a v-for="(tag, index) in tags" :key="index" class="tag" href=""
            >#{{ tag }}</a
          >
        </div>
        <div class="footer">
          <div class="details">
            <a href="">
              <HeartIcon class="icon" />
              <span>{{ randomNum }} Reactions</span>
            </a>
            <a href="">
              <CommentIcon class="icon" />
              <span>{{ meta.comments_count }} Comments</span>
            </a>
          </div>
          <div class="save">
            <small>1 min read</small>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import HeartIcon from './icons/HeartIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
import { computed } from '@vue/runtime-core';
import { DateTime } from 'luxon';
import { useRouter } from 'vue-router';

type Tag = {
  name: string;
};

type Meta = {
  comments_count: number;
};

type Author = {
  id: number;
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  summary: string;
  location: string;
  website_url: string;
  profile_image: string;
  joined_at: string;
  updated_at: string;
};

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  title,
  published_at: publishedAt,
  author,
  tags,
  slug,
} = defineProps<{
  title: string;
  author: Author;
  published_at: string;
  tags: Tag[];
  meta: Meta;
  slug: string;
}>();

const randomNum = Math.floor(Math.random() * 100);

const date = computed(() => {
  const currentYear = DateTime.now().year;

  const dateObj = DateTime.fromISO(publishedAt);
  const part1 = dateObj.toFormat('LLL dd');
  const part2 =
    dateObj.year < currentYear
      ? `'${dateObj.year.toString().slice(-2)}`
      : `(${dateObj.toRelative({ locale: 'en' })})`;

  return `${part1} ${part2}`;
});
const router = useRouter();

const redirectMe = () => {
  router.push({ path: `/${author.username}/${slug}` });
};
</script>

<style scoped>
.icon {
  margin-right: 0.25rem;
  fill: #d6d6d7;
}
article {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
  cursor: pointer;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  background-color: rgb(23, 23, 23);
  position: relative;
}
.post {
  padding: 1.25rem;
}
.post-top {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
.author-picture {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}
.avatar-image {
  border-radius: 100%;
}
.author-name {
  color: rgb(250, 250, 250);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.1rem;
  display: inline-block;
}
.author-name:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #f9f9f9;
}
.publish-date {
  color: rgb(163, 163, 163);
  font-size: 0.75rem;
  line-height: 0.94rem;
}
.publish-date:hover {
  color: rgb(250, 250, 250);
}
.post-bottom {
  padding-left: 2.5rem;
}
.title {
  margin: 0;
  margin-bottom: 0.2rem;
}
.title:hover {
  color: rgb(165, 180, 252);
}
.tags {
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
}

.tag {
  background: transparent;
  color: rgb(212, 212, 212);
  border-radius: 0.375rem;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  text-decoration: none;
  padding: 4px 7px;
  font-size: 0.875rem;
}

.tag:hover {
  background-color: rgba(250, 250, 250, 0.05);
  color: rgb(245, 245, 245);
  box-shadow: inset 0 0 0 1px rgba(250, 250, 250, 0.05),
    inset 0 0 0 1px rgba(250, 250, 250, 0.05),
    inset 0 0 0 1px rgba(250, 250, 250, 0.05);
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.details {
  display: flex;
  align-items: center;
  justify-content: center;
}
.details svg {
  margin-right: 0.25rem;
}
.details a {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 4px 12px 4px 8px;
  border-radius: 6px;
  line-height: 2rem;
}
.details a:hover {
  background-color: rgba(255, 255, 255, 0.035);
  color: #f9f9f9;
}
.details a span {
  font-size: 0.875rem;
  color: rgb(214, 214, 215);
}
.save {
  display: flex;
  align-items: center;
}
.save small {
  margin-right: 0.5rem;
  color: rgb(163, 163, 163);
  font-size: 80%;
}
.save button {
  display: inline-block;
  padding: 4px 12px;
  background-color: rgb(61, 61, 61);
  border-radius: 0.375rem;
  color: #d6d6d7;
  border: 0;
  font-size: 0.875rem;
  line-height: 1.5rem;
  cursor: pointer;
}
.save button:hover {
  background-color: #575757;
  color: #f9f9f9;
}
</style>
