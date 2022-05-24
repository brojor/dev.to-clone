<template>
  <div class="toolbar">
    <button v-for="button in buttons" :key="button.name" class="btn icon-alone">
      <component :is="button.component" />
    </button>
    <button class="btn icon-alone"><DropDownIcon /></button>
  </div>
</template>

<script setup>
import BoldIcon from "./icons/toolbar/BoldIcon.vue";
import ItalicIcon from "./icons/toolbar/ItalicIcon.vue";
import LinkIcon from "./icons/toolbar/LinkIcon.vue";
import OrderedListIcon from "./icons/toolbar/OrderedListIcon.vue";
import UnorderedListIcon from "./icons/toolbar/UnorderedListIcon.vue";
import HeadingIcon from "./icons/toolbar/HeadingIcon.vue";
import QuoteIcon from "./icons/toolbar/QuoteIcon.vue";
import CodeIcon from "./icons/toolbar/CodeIcon.vue";
import CodeBlockIcon from "./icons/toolbar/CodeBlockIcon.vue";
import UploadImageIcon from "./icons/toolbar/UploadImageIcon.vue";
import DropDownIcon from "./icons/toolbar/DropDownIcon.vue";

const buttons = [
  {
    name: "bold",
    component: BoldIcon,
    // sign: "**",
    // method: togglePairSign,
  },
  {
    name: "italic",
    component: ItalicIcon,
    // sign: "_",
    // method: togglePairSign,
  },
  {
    name: "link",
    component: LinkIcon,
    // method: toggleUrl,
  },
  {
    name: "ol",
    component: OrderedListIcon,
    // method: () => list({ ordered: true }),
  },
  {
    name: "ul",
    component: UnorderedListIcon,
    // method: () => list({ ordered: false }),
  },
  {
    name: "heading",
    component: HeadingIcon,
    // sign: "`",
    // method: togglePairSign,
  },
  {
    name: "quote",
    component: QuoteIcon,
    // sign: "`",
    // method: togglePairSign,
  },
  {
    name: "code",
    component: CodeIcon,
    // sign: "`",
    // method: togglePairSign,
  },
  {
    name: "codeBlock",
    component: CodeBlockIcon,
    // sign: "\n```\n",
    // method: togglePairSign,
  },
  {
    name: "uploadImage",
    component: UploadImageIcon,
  },
];
</script>

<style scoped>
.toolbar {
  margin-left: -0.5rem;
  width: 686px;
  height: 40px;
  display: flex;
}
button {
  margin-right: 0.25rem;
}
button:last-child {
  margin-left: auto;
  margin-right: 0;
}
</style>
