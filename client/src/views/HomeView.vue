<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<template>
  <div class="index-container">
    <aside class="sidebar-left"></aside>
    <main>
      <article>
        <a href=""></a>
        <div class="post">
          <div class="post-top">
            <div class="author-picture">
              <a href=""
                ><img
                  class="avatar-image"
                  src="https://res.cloudinary.com/practicaldev/image/fetch/s--5ioMORMj--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/613419/750e0b0a-60d5-42be-b1d3-fe9c254e0281.png"
                  alt=""
              /></a>
            </div>
            <div>
              <div class="author-name">phongdang707</div>
              <div class="publish-date">Apr 15 (15 hours ago)</div>
            </div>
          </div>
          <div class="post-bottom">
            <h3 class="title">Hello, World!</h3>
            <div class="tags">
              <a class="tag" href="">#discuss</a>
              <a class="tag" href="">#help</a>
            </div>
            <div class="footer">
              <div class="details">
                <a href="">
                  <svg width="24" height="24"></svg>
                  <span>7 Reactions</span>
                </a>
                <a href="">
                  <svg width="24" height="24"></svg>
                  <span>6 Comments</span>
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
    </main>
    <aside class="sidebar-right"></aside>
  </div>
</template>

<style scoped>
.index-container {
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 15rem minmax(0, 2fr) 1fr;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 90vh;
}

/* posts start */
article {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
  cursor: pointer;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  /* border: 1px solid white; */
  background-color: rgb(23, 23, 23);
}
.post {
  padding: 1.25rem;
  /* border: 1px dashed rgb(116, 116, 116); */
}
.post-top {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  /* min-height: 35px;
  border: 1px dashed rgb(116, 116, 116); */
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
  /* border: 1px dashed rgb(116, 116, 116); */
}
.title {
  margin: 0;
  margin-bottom: 0.2rem;

  /* border: 1px dashed rgb(116, 116, 116);
  min-height: 28px; */
}
.title:hover {
  color: rgb(165, 180, 252);
}
.tags {
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1px;

  /* border: 1px dashed rgb(116, 116, 116); */
  /* min-height: 29px; */
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

  /* border: 1px dashed rgb(116, 116, 116); */
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
/* posts end */

main {
  /* border: 1px solid rgb(4, 190, 4); */
  flex-grow: 1;
}

.sidebar-left {
  border: 1px solid sandybrown;
}

.sidebar-right {
  border: 1px solid sandybrown;
}
</style>
