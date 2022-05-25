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
      <ToolTip :text="button.tooltip" />
    </button>
    <input
      type="file"
      id="image-upload-field"
      accept="image/*"
      class="screen-reader-only"
    />
    <button
      class="btn icon-alone"
      type="button"
      data-test="uploadImage"
      @click="uploadImage"
    >
      <UploadImageIcon />
      <ToolTip text="Upload image" />
    </button>
    <button class="btn icon-alone">
      <DropDownIcon />
    </button>
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
import ToolTip from "./ToolTip.vue";

const targetEl = ref<HTMLTextAreaElement | null>(null);

const {
  togglePairSign,
  toogleList,
  toggleUrl,
  toggleHeading,
  toggleQuote,
  toggleCodeBlock,
} = useToolbar(targetEl);

onMounted(() => {
  targetEl.value = document.getElementById(
    "raw-markdown"
  ) as HTMLTextAreaElement;
});

const uploadImage = () => {
  const imageField = document.getElementById("image-upload-field");
  if (imageField) {
    imageField.click();
  }
};

const buttons = [
  {
    name: "bold",
    component: BoldIcon,
    method: () => togglePairSign("**"),
    tooltip: "Bold CMD + B",
  },
  {
    name: "italic",
    component: ItalicIcon,
    method: () => togglePairSign("_"),
    tooltip: "Italic CMD + I",
  },
  {
    name: "link",
    component: LinkIcon,
    method: toggleUrl,
    tooltip: "Link CMD + K",
  },
  {
    name: "ol",
    component: OrderedListIcon,
    method: () => toogleList({ ordered: true }),
    tooltip: "Ordered List",
  },
  {
    name: "ul",
    component: UnorderedListIcon,
    method: () => toogleList({ ordered: false }),
    tooltip: "Unordered List",
  },
  {
    name: "heading",
    component: HeadingIcon,
    method: toggleHeading,
    tooltip: "Heading",
  },
  {
    name: "quote",
    component: QuoteIcon,
    method: toggleQuote,
    tooltip: "Quote",
  },
  {
    name: "code",
    component: CodeIcon,
    method: () => togglePairSign("`"),
    tooltip: "Code",
  },
  {
    name: "codeBlock",
    component: CodeBlockIcon,
    method: toggleCodeBlock,
    tooltip: "Code block",
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
