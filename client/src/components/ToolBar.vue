<template>
  <div class="toolbar">
    <button
      v-for="button in buttons"
      :key="button.name"
      type="button"
      @click="button.method"
      class="btn icon-alone"
      :data-test="button.name"
    >
      <component :is="button.component" />
    </button>
    <button class="btn icon-alone"><DropDownIcon /></button>
  </div>
</template>

<script setup lang="ts">
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
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useToolbar from "../composables/toolbar";

const targetEl = ref<HTMLTextAreaElement | null>(null);

const { togglePairSign, toogleList, toggleUrl, toggleHeading } =
  useToolbar(targetEl);

onMounted(() => {
  targetEl.value = document.getElementById(
    "raw-markdown"
  ) as HTMLTextAreaElement;
});

const buttons = [
  {
    name: "bold",
    component: BoldIcon,
    method: () => togglePairSign("**"),
  },
  {
    name: "italic",
    component: ItalicIcon,
    method: () => togglePairSign("_"),
  },
  {
    name: "link",
    component: LinkIcon,
    method: toggleUrl,
  },
  {
    name: "ol",
    component: OrderedListIcon,
    method: () => toogleList({ ordered: true }),
  },
  {
    name: "ul",
    component: UnorderedListIcon,
    method: () => toogleList({ ordered: false }),
  },
  {
    name: "heading",
    component: HeadingIcon,
    method: toggleHeading,
  },
  {
    name: "quote",
    component: QuoteIcon,
  },
  {
    name: "code",
    component: CodeIcon,
    method: () => togglePairSign("`"),
  },
  {
    name: "codeBlock",
    component: CodeBlockIcon,
    method: () => togglePairSign("```"),
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
