<template>
  <li class="tag-item">
    <button
      type="button"
      class="btn"
      :style="{ backgroundColor: `${props.tag.color}1a` }"
    >
      <span :style="{ color: props.tag.color }"># </span>{{ props.tag.name }}
    </button>
    <button
      :style="{ backgroundColor: `${props.tag.color}1a` }"
      type="button"
      class="btn"
    >
      <CloseIcon />
    </button>
  </li>
</template>

<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";

interface Tag {
  name: string;
  description: string;
  color: string;
}

const props = defineProps<{
  tag: Tag;
}>();
</script>

<style>
.tag-item {
  margin: 0 0.25rem 0.25rem 0;
  display: flex;
  width: max-content;
}

.tag-item button {
  padding: 0.25rem;
}

.tag-item button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  cursor: text;
}

.tag-item button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
