<template>
  <li class="tag-item" ref="myli">
    <button
      type="button"
      class="btn"
      :style="{ backgroundColor: `${props.tag.color}1a` }"
      @click="$emit('change', { tag: props.tag, order: props.order })"
    >
      <span :style="{ color: props.tag.color }"># </span>{{ props.tag.name }}
    </button>
    <button
      :style="{ backgroundColor: `${props.tag.color}1a` }"
      type="button"
      class="btn"
      @click="props.onRemove(props.tag)"
    >
      <CloseIcon />
    </button>
  </li>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import CloseIcon from "../icons/CloseIcon.vue";

interface Tag {
  name: string;
  description: string;
  color: string;
}

const props = defineProps<{
  tag: Tag;
  onRemove: (tag: Tag) => void;
  order: number;
}>();

const myli = ref<HTMLLIElement | null>(null);

onMounted(() => {
  if (myli.value) {
    myli.value.style.order = props.order.toString();
  }
});
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
