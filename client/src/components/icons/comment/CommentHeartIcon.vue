<template>
  <svg
    v-if="isActive"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    role="img"
    class="active"
  >
    <path
      d="M5.116 12.595a4.875 4.875 0 015.56-7.68h-.002L7.493 8.098l1.06 1.061 3.181-3.182a4.875 4.875 0 016.895 6.894L12 19.5l-6.894-6.894.01-.01z"
    ></path>
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    role="img"
  >
    <path
      d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.active {
  fill: rgb(239, 68, 68);
}
</style>
