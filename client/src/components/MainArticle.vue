<template>
  <main class="article-wrapper">
    <article v-if="post.title">
      <header class="article-header">
        <figure>
          <img
            :src="post.image"
            alt="article cover image"
            class="cover-image"
          />
        </figure>
        <div class="header-meta">
          <div class="autor-info">
            <div class="avatar-image">
              <a href="">
                <img
                  width="40"
                  height="40"
                  :src="post.author.profile_image"
                  alt="Author avatar image"
                />
              </a>
            </div>
            <div class="name-and-date">
              <a href="">{{ post.author.name }}</a>
              <p>{{ date1 }}</p>
            </div>
          </div>
          <h1>
            {{ post.title }}
          </h1>
          <div class="tags">
            <PrefixedTag v-for="(tag, index) in tags" :key="index" :tag="tag" />
          </div>
        </div>
      </header>
      <div class="article-body">
        <span v-html="articleBody"></span>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { DateTime } from 'luxon';
import PrefixedTag from '../components/PrefixedTag.vue';
import { computed } from 'vue';

export interface Post {
  id: number;
  title: string;
  image: string;
  user_id: number;
  body: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags?: TagsEntity[] | null;
  author: Author;
  meta: Meta;
}
export interface TagsEntity {
  name: string;
}
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
export interface Meta {
  comments_count: number;
}

const post = defineProps<Post>();

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  },
});

const articleBody = computed(() => {
  if (post.body) {
    return md.render(post.body);
  }
  return '';
});
const date1 = computed(() => {
  const published = DateTime.fromISO(post.published_at);
  const updated = DateTime.fromISO(post.updated_at);
  const now = DateTime.now();
  const format = published.year === now.year ? 'dd. L' : 'dd. L. yyyy';

  const part1 = `Posted on ${published.toFormat(format)}`;
  const part2 = `Updated on ${updated.toFormat(format)}`;
  if (published.equals(updated)) {
    return part1;
  }
  return `${part1} • ${part2}`;
});

const tags = computed(() => {
  return post.tags.reduce((arr, { name }) => [...arr, name], []);
});
</script>

<style>
.avatar-image img {
  border-radius: 9999px;
}
.name-and-date {
  padding-left: 0.75rem;
}
.name-and-date a {
  text-decoration: none;
  color: rgb(212, 212, 212);
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
}
.name-and-date p {
  color: #a3a3a3;
  font-size: 0.75rem;
  line-height: 1.125rem;
  margin: 0;
}
.article-body {
  padding: 2rem 4rem;
  overflow-wrap: break-word;
  display: block;
  overflow: hidden;
  font-size: 1.25rem;
  line-height: 1.875rem;
}

figure {
  position: relative;
  width: 100%;
  padding-top: 42%;
}

.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.header-meta {
  padding: 2rem 4rem 0 4rem;
}

.autor-info {
  display: flex;
  margin-bottom: 1.25rem;
}

.tags {
  display: flex;
}
</style>
