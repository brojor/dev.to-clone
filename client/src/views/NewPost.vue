<template>
  <h1>this is new post</h1>
  <textarea ref="textarea" cols="30" rows="10"></textarea>
  <button @click="bold">bold</button>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';

const textarea = ref<HTMLTextAreaElement | null>(null);

const addPairSign = (textarea: HTMLTextAreaElement, sign: string) => {
  const { selectionStart, selectionEnd, value } = textarea;

  const firstPart = value.slice(0, selectionStart);
  const middlePart = value.slice(selectionStart, selectionEnd);
  const lastPart = value.slice(selectionEnd);

  textarea.value = `${firstPart}${sign}${middlePart}${sign}${lastPart}`;

  textarea.selectionStart = selectionStart + sign.length;
  textarea.selectionEnd = selectionEnd + sign.length;

  textarea.focus();
};
const removePairSign = (textarea: HTMLTextAreaElement, sign: string) => {
  const { selectionStart, selectionEnd, value } = textarea;

  const firstPart = value.slice(0, selectionStart - sign.length);
  const middlePart = value.slice(selectionStart, selectionEnd);
  const lastPart = value.slice(selectionEnd + sign.length);

  textarea.value = `${firstPart}${middlePart}${lastPart}`;

  textarea.selectionStart = selectionStart - sign.length;
  textarea.selectionEnd = selectionEnd - sign.length;

  textarea.focus();
};

const bold = async () => {
  const sign = '**';
  const { selectionStart, selectionEnd, value: textContent } = textarea.value!;

  const before = textContent.slice(selectionStart - 2, selectionStart);
  const after = textContent.slice(selectionEnd, selectionEnd + 2);

  console.log({ before, after, sign });

  if (before === after && after === sign) {
    removePairSign(textarea.value!, sign);
  } else {
    addPairSign(textarea.value!, sign);
  }
};
</script>

<style></style>
