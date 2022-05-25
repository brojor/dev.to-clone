<template>
  <div class="cover">
    <img v-if="currentImage" :src="previewImage" alt="Post cover" />
    <div class="btns-container">
      <label @change="selectImage">
        {{ labelText }}
        <input ref="input" type="file" accept="image/*" />
      </label>
      <button
        class="btn btn-ghost-danger"
        v-if="currentImage"
        @click="removeImage"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/runtime-core";

const input = ref<HTMLInputElement | null>(null);
const currentImage = ref<File | null>(null);
const previewImage = ref<string | undefined>(undefined);

const labelText = computed(() => {
  return currentImage.value ? "Change" : "Add a cover image";
});

const selectImage = () => {
  console.dir(input.value);
  if (input.value && input.value.files && input.value.files.length) {
    currentImage.value = input.value.files[0];
    previewImage.value = URL.createObjectURL(currentImage.value);
  }
};
const removeImage = () => {
  currentImage.value = null;
  previewImage.value = undefined;
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
