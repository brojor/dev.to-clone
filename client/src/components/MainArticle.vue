<template>
  <main class="article-wrapper" v-if="post">
    <article class="article">
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
      <ArticleDiscussion
        :comments="comments"
        :comments-count="post.meta.comments_count"
        @change="handleCommentChange"
      />
    </article>
  </main>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { DateTime } from 'luxon';
import PrefixedTag from '../components/PrefixedTag.vue';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import ArticleDiscussion from './ArticleDiscussion.vue';

import type { Post, Author, Comment } from '../interfaces';
import { useRoute } from 'vue-router';

/* REFs */
const post = ref<Post>();
const comments = ref<Comment[]>([]);

/* CONSTs */
const {
  params: { username, slug },
} = useRoute();

/* COMPUTED */
const articleBody = computed(() => {
  if (post.value?.body) {
    return md.render(post.value.body);
  }
  return '';
});

const date1 = computed(() => {
  const published = DateTime.fromISO(post.value.published_at);
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
  return post.value?.tags?.reduce((arr, { name }) => [...arr, name], []);
});

/** HOOKS */
onMounted(async () => {
  const { data } = await axios.get(`http://localhost:3333/${username}/${slug}`);

  post.value = data.post;
  comments.value = data.comments;
});

/** METHODS */
const handleCommentChange = async () => {
  const postId = 1;
  const { data } = await axios.get(
    `http://localhost:3333/comments?postId=${postId}`
  );
  comments.value = data;
};

/** OTHER */
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
</script>

<style lang="scss">
.article {
  border-radius: 0.375rem;
  background: var(--card-bg);
  color: var(--card-color);
  box-shadow: 0 0 0 1px var(--card-border);
}
.article-header {
  border-radius: 0.375rem;
  overflow: hidden;
}
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
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--ff-sans-serif);
    margin: calc(var(--content-rhythm) / 2) 0;
    padding: 0;
    font-weight: var(--fw-bold);
    line-height: var(--lh-tight);
  }
  & h1 {
    font-size: 1.75em;
  }
  & h2 {
    font-size: 1.5em;
  }
  & h3 {
    font-size: 1.25em;
  }
  & h4 {
    font-size: 1em;
  }
  & h5 {
    font-size: 0.875em;
  }
  & h6 {
    font-size: 0.85em;
    color: rgb(163 163 163);
  }
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
