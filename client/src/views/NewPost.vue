<template>
  <form action="">
    <header>
      <router-link to="/" class="site-logo">
        <img
          src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
          alt="DEV Community"
      /></router-link>
      <span>Create Post</span>
      <nav>
        <button type="button" class="tabs-item active">Edit</button>
        <button type="button" class="tabs-item">Preview</button>
      </nav>
      <button class="btn icon-alone form-close">
        <CloseIcon />
      </button>
    </header>
    <main>
      <div class="form-content-top">
        <NewPostCover />
        <div class="title">
          <textarea placeholder="New post title here..."></textarea>
        </div>
        <div class="tags">
          <ul class="tag-list">
            <TagListItem
              v-for="(tag, index) in selectedTags"
              :key="tag.name"
              :tag="tag"
              @remove="removeTag"
              @change="changeTag"
              :order="index + 1"
            />
            <li
              v-show="selectedTags.length < 4"
              ref="inputParent"
              :style="{ order: 5 }"
            >
              <input
                type="text"
                :placeholder="
                  selectedTags.length ? 'Add another...' : 'Add up to 4 tags...'
                "
                v-model="tagInput"
                ref="inputElement"
                @focusin="isOpen = true"
              />
            </li>
          </ul>
          <MultiPopover
            v-if="isOpen"
            @select="handleTagSelect"
            :filter="tagInput"
            :selected-tags="selectedTags"
          />
        </div>
      </div>
      <div class="form-content-body">
        <div class="toolbar-wrapper">
          <ToolBar />
        </div>
        <div class="body-textarea-container">
          <textarea
            id="raw-markdown"
            placeholder="Write your post content here..."
            name="body-markdown"
          ></textarea>
        </div>
      </div>
    </main>
    <aside></aside>
    <footer>
      <button class="btn btn-primary">Publish</button>
      <button class="btn">Save draft</button>
      <button class="btn icon-alone"><OptionsIcon /></button>
      <button class="btn">Revert new changes</button>
    </footer>
  </form>
</template>

<script setup lang="ts">
import OptionsIcon from "../components/icons/OptionsIcon.vue";
import CloseIcon from "../components/icons/CloseIcon.vue";
import ToolBar from "../components/ToolBar.vue";
import NewPostCover from "../components/newPost/NewPostCover.vue";
import MultiPopover from "../components/newPost/MultiPopover.vue";
import { ref } from "@vue/reactivity";
import TagListItem from "../components/newPost/TagListItem.vue";
import { nextTick } from "vue";
import { onClickOutside } from "@vueuse/core";

interface Tag {
  name: string;
  description: string;
  color: string;
}

const tagInput = ref<string>("");
const selectedTags = ref<Tag[]>([]);
const inputParent = ref<HTMLLIElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const tags = ref<HTMLElement | null>(null);

const isOpen = ref<boolean>(false);

onClickOutside(inputElement, (event) => {
  const popover = document.querySelector(".multi-popover");
  if (popover && !popover.contains(event.target as Node)) {
    isOpen.value = false;
  }
});

const handleTagSelect = (tag: Tag) => {
  if (inputParent.value) {
    if (inputParent.value.style && inputParent.value.style.order) {
      selectedTags.value.splice(
        Number(inputParent.value.style.order) - 1,
        0,
        tag
      );
    }
    inputParent.value.style.order = selectedTags.value.length + 2 + "";
    tagInput.value = "";
    inputElement.value?.focus();
  }
};
const removeTag = (tag: Tag) => {
  selectedTags.value = selectedTags.value.filter((t) => t.name !== tag.name);
};

const changeTag = ({ tag, order }: { tag: Tag; order: number }) => {
  if (inputParent.value) {
    tagInput.value = tag.name;
    removeTag(tag);
    inputParent.value.style.order = order.toString();

    nextTick(() => {
      if (inputParent.value?.firstChild instanceof HTMLInputElement) {
        inputParent.value?.firstChild.focus();
      }
    });
  }
};
</script>

<style>
#app {
  padding-top: 0;
}
</style>

<style scoped>
form {
  display: grid;
  grid-template-columns: 64px 7fr 3fr;

  max-width: var(--site-width);
  display: grid;
  padding: 0 var(--layout-padding);
  height: 100vh;
  gap: 0 var(--layout-gap);
  margin: 0 auto;
  font-size: 1rem;

  grid-template-rows: min-content 1fr min-content;
}
.form-content-top {
  padding: var(--content-padding-y) var(--content-padding-x);
  border-radius: 0.375rem 0.375rem 0 0;
}

.form-content-top .title {
  margin-bottom: 0.5rem;
}
.form-content-top textarea {
  min-height: 60px;
  max-height: 60px;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.25;

  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  width: 100%;
  box-shadow: none;
  resize: none;
  transition: none;
  font-family: inherit;

  color: var(--body-color);
}
::placeholder {
  color: #575757;
  opacity: 1;
}
/* TAGS */
.tags {
  position: relative;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
}

.tag-list li:last-child {
  align-self: center;
}
.tags input {
  outline: none;
  border: none;
  color: var(--body-color);
  background-color: var(--bg-color);
  font-family: inherit;
  font-size: 100%;
  line-height: 1.5;
}
.tags input::placeholder {
  color: #757575;
}

.form-content-body {
  flex: 1 0 auto;
  position: relative;
  outline: none;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0.375rem 0.375rem;
  padding: var(--content-padding-y) var(--content-padding-x);
}
.form-content-body .toolbar-wrapper {
  position: sticky;
  top: 0;
  background: rgb(9, 9, 9);
  padding: 0.5rem var(--content-padding-x);
  padding-right: var(--toolbar-padding-right, 0);
  overflow-x: auto;
  flex-shrink: 0;
  margin: calc(var(--content-padding-y) * -1)
    calc(var(--content-padding-x) * -1) 1.5rem
    calc(var(--content-padding-x) * -1);
  overflow: visible;
}

header {
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 0;

  display: flex;
  align-items: center;
  height: var(--header-height);
}

header .site-logo {
  max-width: 200px;
  font-size: 1.25rem;
  display: inline-flex;
  align-self: center;
  align-items: center;
  margin-right: var(--layout-gap);
}
header .site-logo img {
  height: calc(var(--header-height) - 1rem);
}

header span {
  flex: 1 1 0% !important;
  font-weight: 500;
}

header nav {
  display: flex;
  font-family: var(--ff-sans-serif);
}
.tabs-item {
  padding: var(--tab-vertical-padding) var(--tab-horizontal-padding);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  color: var(--tab-color);
  position: relative;
  border-radius: 0.375rem;
  transition: all cubic-bezier(0.17, 0.67, 0.5, 0.71) 100ms;
  width: 100%;
  border: none;
  background: transparent;
  margin: 0 0.25rem;
  font-family: inherit;
}
.tabs-item.active {
  font-weight: 500;
  color: var(--tab-color-current);
}

.form-close {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

main {
  height: calc(
    100vh - var(--header-height) - var(--article-form-actions-height)
  );
  grid-column-start: 2;
  grid-column-end: 2;
  border-radius: 0.375rem;
  background: var(--card-bg);
  color: var(--card-color);
  box-shadow: 0 0 0 1px var(--card-border);

  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
  overflow: auto;
}
.body-textarea-container {
  min-height: 27px;
  height: 100%;
}

textarea[name="body-markdown"] {
  min-height: 27px;
  height: 100% !important;
  font-size: 1.125rem;
  font-family: var(--ff-monospace);
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  width: 100%;
  box-shadow: none;
  resize: none;
  transition: none;
  color: var(--body-color);
  line-height: 1.5;
}
aside {
  border: 1px solid chartreuse;
}
footer {
  grid-column-start: 2;
  grid-column-end: span 2;
  height: var(--article-form-actions-height);
  display: flex;
  align-items: center;
}

footer button:nth-child(-n + 2) {
  margin-right: 0.5rem;
}
footer button:last-child {
  font-weight: normal;
  font-size: 0.875rem;
}
</style>
