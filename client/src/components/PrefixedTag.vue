<template>
  <a href=""> <span class="tag-prefix">#</span>{{ tag }} </a>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import colors from '../colors.json';

const props = defineProps<{
  //   color: number[];
  tag: string;
}>();

const [r, g, b] = colors[props.tag as keyof typeof colors] || [212, 212, 212];

const prefixColor = computed(() => {
  return `rgb(${r}, ${g}, ${b})`;
});
const tagBgColor = computed(() => {
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
});
</script>

<style>
.tags a {
  text-decoration: none;
  color: rgb(212, 212, 212);
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 0.375rem;
  /* background-color: rgba(0, 131, 53, 0.10); */
  padding: 0.25rem 0.5rem;
}
.tags a:hover {
  background-color: v-bind(tagBgColor);
  box-shadow: inset 0 0 0 1px v-bind(tagBgColor),
    inset 0 0 0 1px v-bind(tagBgColor), inset 0 0 0 1px v-bind(tagBgColor);
}

.tag-prefix {
  color: v-bind(prefixColor);
}
</style>
