<script setup lang="ts">
import content from '../markdown-text';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

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

const articleBody = md.render(content);
// import content from './test-export';

console.log({ articleBody });

const imageUrl =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--8XoR-zPX--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sb1yxfht2b1myzo64lqo.png';
</script>

<template>
  <aside class="sidebar-left"></aside>
  <main>
    <div class="article-wrapper">
      <article>
        <header class="article-header">
          <figure>
            <img :src="imageUrl" alt="article cover image" />
          </figure>
          <div class="header-meta">
            <div class="autor-info"></div>
            <h1>
              Why Use GitHub Copilot And Copilot Labs: Practical Use Cases for
              the AI Pair Programmer
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
</template>

<style scoped>
.article-body {
  padding: 2rem 4rem;
  overflow-wrap: break-word;
  display: block;
  overflow: hidden;
  font-size: 1.25rem;
  line-height: 1.875rem;
}
header {
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
