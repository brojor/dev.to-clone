<template>
  <div class="article-body">
    <div v-for="(chunk, index) in chunks" :key="`chunk-${index}`">
      <span v-html="chunk"></span>
      <h5 class="embeded" v-if="embededComponents[index]">
        &lt;embeded :is="{{ embededComponents[index].type }}" :identifier="{{
          embededComponents[index].id
        }}" /&gt;
      </h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";

const props = defineProps<{
  articleBody: string;
}>();

const chunks = splitHtmlByLiquidTags(props.articleBody);

const embededComponents = computed(() => {
  const liquidTags = props.articleBody.match(/{%.+?%}/g);
  return liquidTags ? liquidTags.map((tag) => parseLiquidTag(tag)) : [];
});

function splitHtmlByLiquidTags(html: string) {
  const splitHtml = html.split(/{%.+?%}/);
  return splitHtml;
}
function parseLiquidTag(liquidTag: string) {
  const innerText = liquidTag.replace(/{%|%}/g, "").trim();
  const [type, id] = innerText.split(" ");

  return { type, id };
}
</script>

<style scoped>
.embeded {
  color: rgb(157, 0, 97);
  font-size: 1rem;
  font-weight: 400;
}
</style>
