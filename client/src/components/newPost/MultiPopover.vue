<template>
  <div class="multi-popover">
    <h2 class="tags-heading">Top tags</h2>
    <ul>
      <li v-for="tag in tags" :key="tag.name">
        <div class="tag-option" @click="$emit('select', tag)">
          <div class="option-title">
            <span class="prefix" :style="{ color: tag.color }"># </span
            ><span class="option-name">{{ tag.name }}</span>
          </div>
          <span class="option-description"> {{ tag.description }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import _tags from "../../data/tags.json";

interface Tag {
  name: string;
  description: string;
  color: string;
}

const props = defineProps<{
  filter: string;
  selectedTags: Tag[];
}>();

const tags = computed(() => {
  const unselectedTags = _tags.filter(
    (tag) =>
      !props.selectedTags.find((selectedTag) => selectedTag.name === tag.name)
  );
  if (props.filter) {
    const filtredTags = unselectedTags.filter((tag) =>
      tag.name.toLowerCase().includes(props.filter.toLowerCase())
    );
    return filtredTags.length
      ? filtredTags
      : [{ name: props.filter, color: "#fafafa", description: "" }];
  } else {
    return unselectedTags;
  }
});
</script>

<style scoped>
.multi-popover {
  position: absolute;
  max-height: 500px;
  overflow: auto;
  width: 100%;
  padding: 0.25rem;
  z-index: 1;
  background: var(--card-bg);
  color: var(--card-color);
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--card-border);
  margin-top: 0.5rem;
}

.tags-heading {
  padding: 0.75rem;
  font-size: 1.125rem;
  border-bottom: 1px solid rgb(61, 61, 61);
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-option {
  background: var(--card-bg);
  color: var(--card-color);
  padding: 0.75rem;
  border-radius: 0.375rem;
}
.tag-option:hover {
  background: var(--body-bg);
}
.tag-option:hover .prefix[style] {
  color: var(--accent-brand-darker) !important;
}

.option-title {
  font-weight: 500;
}
.tag-option:hover .option-title {
  color: var(--accent-brand-darker);
}

.option-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.875rem;
}
</style>
