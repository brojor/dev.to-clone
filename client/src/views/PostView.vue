<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

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

const post = ref<any>({});

const articleBody = computed(() => {
  if (post.value.body) {
    return md.render(post.value.body);
  }
  return '';
});

onMounted(async () => {
  const { data } = await axios.get('http://localhost:3333');
  post.value = data[0];
});
</script>

<template>
  <div class="index-container">
    <aside class="sidebar-left"></aside>
    <main>
      <div class="article-wrapper">
        <article>
          <header class="article-header">
            <figure>
              <img :src="post.image" alt="article cover image" />
            </figure>
            <div class="header-meta">
              <div class="autor-info"></div>
              <h1>
                {{ post.title }}
              </h1>
              <div class="tags"></div>
            </div>
          </header>
          <div class="article-body">
            <span v-html="articleBody"></span>
          </div>
        </article>
      </div>
    </main>
    <aside class="sidebar-right"></aside>
  </div>
</template>

<style scoped>
.index-container {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 4rem minmax(0, 7fr) 3fr;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 90vh;
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

img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

main {
  border: 1px solid rgb(4, 190, 4);
  background-color: rgb(23, 23, 23);
}

.header-meta {
  padding: 2em 4rem;
}

.autor-info {
  height: 62px;
  border: 1px dashed hotpink;
}

.tags {
  height: 2rem;
  border: 1px dashed khaki;
}

.sidebar-left {
  border: 1px solid sandybrown;
}

.sidebar-right {
  border: 1px solid sandybrown;
}
</style>
