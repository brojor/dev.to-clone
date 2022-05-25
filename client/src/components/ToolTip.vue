<template>
  <span class="tooltip">{{ props.text }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style>
.tooltip {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0.25rem);
  background: rgba(255, 255, 255, 0.9);
  color: rgb(38, 38, 38);
  font-size: 0.875rem;
  font-family: var(--ff-sans-serif);
  line-height: 1.125;
  padding: 0.5rem 0.75rem;
  transition: all cubic-bezier(0.17, 0.67, 0.5, 0.71) 200ms;
  transition-delay: 250ms;
  z-index: 500;
  border-radius: 0.375rem;
  width: max-content;
  opacity: 0;
  pointer-events: none;
}

button:hover > .tooltip {
  opacity: 1;
  pointer-events: auto;
}
</style>
