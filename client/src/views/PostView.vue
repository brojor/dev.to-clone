<script setup lang="ts">
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
        <div class="article-body"></div>
      </article>
    </div>
  </main>
  <aside class="sidebar-right"></aside>
</template>

<style scoped>
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
  margin: 0 1rem 0 1rem;
  flex-grow: 1;
}

.header-meta {
  padding: 1.5rem 2rem;
}

.autor-info {
  height: 62px;
  border: 1px dashed hotpink;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

.tags {
  height: 2rem;
  border: 1px dashed khaki;
}

.sidebar-left {
  min-width: 4rem;
  border: 1px solid sandybrown;
}

.sidebar-right {
  min-width: 345px;
  border: 1px solid sandybrown;
}
</style>
