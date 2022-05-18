<template>
  <h1>this is new post</h1>
  <textarea ref="textarea" cols="30" rows="10"></textarea>
  <button v-for="btn in buttons" :key="btn.name" @click="btn.method(btn.sign)">
    {{ btn.name }}
  </button>
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

const togglePairSign = (sign: string) => {
  const { selectionStart, selectionEnd, value: textContent } = textarea.value!;

  const before = textContent.slice(
    selectionStart - sign.length,
    selectionStart
  );
  const after = textContent.slice(selectionEnd, selectionEnd + sign.length);

  if (before === after && after === sign) {
    removePairSign(textarea.value, sign);
  } else {
    addPairSign(textarea.value, sign);
  }
};

const toggleUrl = () => {
  if (textarea.value) {
    const { selectionStart, selectionEnd, value: textContent } = textarea.value;
    const alreadyExist =
      textContent.substring(selectionStart - 2, selectionStart) === '](' &&
      textContent.charAt(selectionEnd) === ')';

    if (alreadyExist) {
      const beforeSelection = textContent.slice(0, selectionStart);

      const startIndex = beforeSelection.lastIndexOf('[');
      const endIndex = beforeSelection.lastIndexOf(']');
      const urlName = beforeSelection.substring(startIndex + 1, endIndex);

      const firstPart = textContent.slice(0, startIndex);
      const lastPart = textContent.slice(selectionEnd + 1);

      textarea.value.value = `${firstPart}${urlName}${lastPart}`;

      textarea.value.selectionStart = startIndex;
      textarea.value.selectionEnd = startIndex + urlName.length;
    } else {
      const firstPart = textContent.slice(0, selectionStart);
      const middlePart = textContent.slice(selectionStart, selectionEnd);
      const lastPart = textContent.slice(selectionEnd);
      textarea.value.value = `${firstPart}[${middlePart}](url)${lastPart}`;
      textarea.value.selectionStart = selectionEnd + 3;
      textarea.value.selectionEnd = selectionEnd + 6;
    }
    textarea.value.focus();
  }
};

const list = () => {
  const { selectionStart, selectionEnd, value: textContent } = textarea.value!;

  const alreadyExist =
    textContent.slice(selectionStart - 3, selectionStart) === '1. ' ||
    /\d. /.test(textContent.slice(selectionStart, selectionEnd));
  console.log({ alreadyExist });

  if (alreadyExist) {
    if (selectionStart === selectionEnd) {
      const firstPart = textContent.slice(0, selectionStart);
      const lastPart = textContent.slice(selectionEnd);
      const newline =
        textContent.charAt(selectionStart - 1) === '\n' || selectionStart === 0
          ? ''
          : '\n\n';

      textarea.value.value = `${firstPart.slice(0, -3)}${lastPart}`;
      textarea.value.selectionStart = selectionStart - 3;
      textarea.value.selectionEnd = selectionStart - 3;
    } else {
      console.log('složitá situace');
      const firstPart = textContent.slice(0, selectionStart);
      const middlePart = textContent.slice(selectionStart, selectionEnd);
      const lastPart = textContent.slice(selectionEnd);
      const result = middlePart.replace(/\d. /g, '');
      textarea.value.value = `${firstPart}${result}${lastPart}`;
      const offset = result.split('\n').length * 3;
      console.log({ offset });
      textarea.value.selectionStart = selectionStart;
      textarea.value.selectionEnd = selectionEnd - offset;
    }
  } else {
    const firstPart = textContent.slice(0, selectionStart);
    const middlePart = textContent.slice(selectionStart, selectionEnd);
    const lastPart = textContent.slice(selectionEnd);
    if (selectionStart === selectionEnd) {
      const newlineBefore =
        textContent.charAt(selectionStart - 1) === '\n' || selectionStart === 0
          ? ''
          : '\n\n';
      const newlineAfter =
        textContent.charAt(selectionStart) === '\n' ? '' : '\n';

      textarea.value.value = `${firstPart}${newlineBefore}1. ${newlineAfter}${lastPart}`;
      const offset = newlineBefore ? 5 : 3;
      textarea.value.selectionStart = selectionStart + offset;
      textarea.value.selectionEnd = selectionStart + offset;
    } else {
      console.log('složitá situace pro vložení');
      const items = middlePart.split('\n');
      console.log({ items });
      const string = items
        .reduce((str, item, index) => {
          return str + `${index + 1}. ${item}\n`;
        }, '')
        .slice(0, -1);
      textarea.value.value = `${firstPart}${string}${lastPart}`;
      const offset = items.length * 3;
      textarea.value.selectionStart = selectionStart;
      textarea.value.selectionEnd = selectionEnd + offset;
    }
  }

  textarea.value.focus();
};

const buttons = [
  { name: 'list', method: list },
  {
    name: 'bold',
    sign: '**',
    method: togglePairSign,
  },
  {
    name: 'italic',
    sign: '_',
    method: togglePairSign,
  },
  {
    name: 'code',
    sign: '`',
    method: togglePairSign,
  },
  {
    name: 'codeBlock',
    sign: '\n```\n',
    method: togglePairSign,
  },

  {
    name: 'strikethrough',
    sign: '~~',
    method: togglePairSign,
  },
  { name: 'url', method: toggleUrl },
];
</script>

<style></style>
