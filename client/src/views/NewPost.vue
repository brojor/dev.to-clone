<template>
  <h1>this is new post</h1>
  <textarea ref="textarea" cols="30" rows="10"></textarea>
  <button
    v-for="btn in buttons"
    :key="btn.name"
    :data-test="btn.name"
    @click="btn.method(btn.sign)"
  >
    {{ btn.name }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

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
      textContent.substring(selectionStart - 2, selectionStart) === "](" &&
      textContent.charAt(selectionEnd) === ")";

    if (alreadyExist) {
      const beforeSelection = textContent.slice(0, selectionStart);

      const startIndex = beforeSelection.lastIndexOf("[");
      const endIndex = beforeSelection.lastIndexOf("]");
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

const list = ({ ordered }: { ordered: boolean }) => {
  const sign = ordered ? "1. " : "- ";
  if (textarea.value) {
    const { selectionStart, selectionEnd, value: textContent } = textarea.value;
    const firstPart = textContent.slice(0, selectionStart);
    const middlePart = textContent.slice(selectionStart, selectionEnd);
    const lastPart = textContent.slice(selectionEnd);

    if (selectionStart === selectionEnd) {
      const alreadyExist =
        textContent.slice(selectionStart - sign.length, selectionStart) ===
        sign;

      if (alreadyExist) {
        textarea.value.value = `${firstPart.slice(0, -sign.length)}${lastPart}`;
        textarea.value.selectionStart = selectionStart - sign.length;
        textarea.value.selectionEnd = selectionStart - sign.length;
      } else {
        const newlineBefore =
          textContent.charAt(selectionStart - 1) === "\n" ||
          selectionStart === 0
            ? ""
            : "\n\n";
        const newlineAfter =
          textContent.charAt(selectionStart) === "\n" || selectionStart === 0
            ? ""
            : "\n";

        textarea.value.value = `${firstPart}${newlineBefore}${sign}${newlineAfter}${lastPart}`;
        const offset = newlineBefore ? sign.length + 2 : sign.length;
        textarea.value.selectionStart = selectionStart + offset;
        textarea.value.selectionEnd = selectionStart + offset;
      }
    } else {
      const regex = ordered ? /\d. /g : /- /g;
      const alreadyExist = regex.test(
        textContent.slice(selectionStart, selectionEnd)
      );
      const items = middlePart.split("\n");
      const offset = items.length * sign.length;
      if (alreadyExist) {
        const result = middlePart.replace(regex, "");
        textarea.value.value = `${firstPart}${result}${lastPart}`;
        textarea.value.selectionEnd = selectionEnd - offset;
      } else {
        const list = makeList(items, { ordered });
        textarea.value.value = `${firstPart}${list}${lastPart}`;
        textarea.value.selectionEnd = selectionEnd + offset;
      }
      textarea.value.selectionStart = selectionStart;
    }
    textarea.value.focus();
  }
};

function makeList(items: string[], { ordered }: { ordered: boolean }) {
  console.log("makelist ordered? ", ordered);
  return items
    .reduce((str, item, index) => {
      const symbol = ordered ? `${index + 1}.` : "-";
      return str + `${symbol} ${item}\n`;
    }, "")
    .slice(0, -1);
}

const buttons = [
  { name: "ol", method: () => list({ ordered: true }) },
  { name: "ul", method: () => list({ ordered: false }) },
  {
    name: "bold",
    sign: "**",
    method: togglePairSign,
  },
  {
    name: "italic",
    sign: "_",
    method: togglePairSign,
  },
  {
    name: "code",
    sign: "`",
    method: togglePairSign,
  },
  {
    name: "codeBlock",
    sign: "\n```\n",
    method: togglePairSign,
  },

  {
    name: "strikethrough",
    sign: "~~",
    method: togglePairSign,
  },
  { name: "link", method: toggleUrl },
];
</script>

<style></style>
