<template>
  <div class="cover">
    <img v-if="coverImage" :src="previewImage" alt="Post cover" />
    <div class="btns-container">
      <label @change="selectImage">
        {{ labelText }}
        <input ref="input" type="file" accept="image/*" />
      </label>
      <button
        class="btn btn-ghost-danger"
        v-if="coverImage"
        @click="$emit('change', { file: null })"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";

const props = defineProps<{
  coverImage: File | null;
}>();

const emit = defineEmits(["change"]);

const previewImage = computed(() => {
  return props.coverImage ? URL.createObjectURL(props.coverImage) : "";
});

const labelText = computed(() => {
  return props.coverImage ? "Change" : "Add a cover image";
});

const selectImage = (event: Event) => {
  if (event.target as HTMLInputElement) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      emit("change", { file });
    }
  }
};
</script>

<style scoped>
.cover {
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
}
img {
  margin-right: 1rem;
  width: 250px;
  height: 105px;
  border-radius: var(--radius);
  object-fit: scale-down;
}

input[type="file"] {
  display: none;
}
label {
  cursor: pointer;
  padding: 6px 14px;
  background: var(--button-outlined-bg);
  border: var(--button-outlined-border);
  color: var(--button-outlined-color);
  border-width: 2px;
  border-style: solid;
  border-radius: 0.375rem;
  display: inline-block;
  font-weight: 500;
}

label:hover {
  background: var(--button-outlined-bg-hover);
  border-color: var(--button-outlined-border-hover);
  color: var(--button-outlined-color-hover);
}
</style>
