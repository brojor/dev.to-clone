<template>
  <form action="">
    <header></header>
    <main>
      <div class="form-content-top">
        <div class="cover">
          <label>
            Add a cover image
            <input type="file" accept="image/*" />
          </label>
        </div>
        <div class="title">
          <textarea placeholder="New post title here..."></textarea>
        </div>
        <div class="tags">
          <input type="text" placeholder="Add up to 4 tags..." />
        </div>
      </div>
      <div class="form-content-body">
        <div class="toolbar-wrapper">
          <div class="toolbar"></div>
        </div>
        <div class="body-textarea-container">
          <textarea
            placeholder="Write your post content here..."
            name="body-markdown"
          ></textarea>
        </div>
      </div>
    </main>
    <aside></aside>
    <footer></footer>
  </form>

  <!-- <h1>this is new post</h1>
  <textarea ref="textarea" cols="30" rows="10"></textarea>
  <button
    v-for="btn in buttons"
    :key="btn.name"
    :data-test="btn.name"
    @click="btn.method(btn.sign)"
  >
    {{ btn.name }}
  </button> -->
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

<style>
#app {
  padding-top: 0;
}
</style>

<style scoped>
form {
  display: grid;
  grid-template-columns: 64px 7fr 3fr;

  max-width: var(--site-width);
  display: grid;
  padding: 0 var(--layout-padding);
  height: 100vh;
  gap: 0 var(--layout-gap);
  margin: 0 auto;
  font-size: 1rem;

  grid-template-rows: min-content 1fr min-content;
}
.form-content-top {
  padding: var(--content-padding-y) var(--content-padding-x);
  border-radius: 0.375rem 0.375rem 0 0;
}
.form-content-top .cover {
  margin-bottom: 1.25rem;
}
.form-content-top .title {
  margin-bottom: 0.5rem;
}
.form-content-top textarea {
  min-height: 60px;
  max-height: 60px;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.25;

  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  width: 100%;
  box-shadow: none;
  resize: none;
  transition: none;
  font-family: inherit;

  color: var(--body-color);
}
::placeholder {
  color: #575757;
  opacity: 1;
}
.tags input {
  outline: none;
  border: none;
  color: var(--body-color);
  background-color: var(--bg-color);
  font-family: inherit;
  font-size: 100%;
  line-height: 1.5;
}
.tags input::placeholder {
  color: #757575;
}

.form-content-body {
  flex: 1 0 auto;
  position: relative;
  outline: none;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0.375rem 0.375rem;
  padding: var(--content-padding-y) var(--content-padding-x);
}
.form-content-body .toolbar-wrapper {
  position: sticky;
  top: 0;
  background: rgb(9, 9, 9);
  padding: 0.5rem var(--content-padding-x);
  padding-right: var(--toolbar-padding-right, 0);
  overflow-x: auto;
  flex-shrink: 0;
  margin: calc(var(--content-padding-y) * -1)
    calc(var(--content-padding-x) * -1) 1.5rem
    calc(var(--content-padding-x) * -1);
}
.toolbar {
  margin-left: -0.5rem;
  width: 686px;
  height: 40px;
}

header {
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 0;

  width: 886px;
  height: 56px;
  border: 1px solid gold;
}

main {
  height: calc(
    100vh - var(--header-height) - var(--article-form-actions-height)
  );
  grid-column-start: 2;
  grid-column-end: 2;
  border-radius: 0.375rem;
  background: var(--card-bg);
  color: var(--card-color);
  box-shadow: 0 0 0 1px var(--card-border);

  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
  overflow: auto;
}
.body-textarea-container {
  min-height: 27px;
  height: 100%;
}

textarea[name="body-markdown"] {
  min-height: 27px;
  height: 100% !important;
  font-size: 1.125rem;
  font-family: var(--ff-monospace);
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  width: 100%;
  box-shadow: none;
  resize: none;
  transition: none;
  color: var(--body-color);
  line-height: 1.5;
}
aside {
  border: 1px solid chartreuse;
}
footer {
  grid-column-start: 2;
  grid-column-end: span 2;

  width: 1168px;
  height: 88px;
  border: 1px solid violet;
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

input[type="file"] {
  display: none;
}
</style>
