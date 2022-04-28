<template>
  <aside class="sidebar-left">
    <div class="article-actions">
      <div class="article-actions-inner">
        <button
          v-for="(reaction, index) in articleReactionCounts"
          :key="index"
          @click="handleClick(reaction.category)"
          :name="reaction.category"
          :is-active="isUsed(reaction.category)"
        >
          <span class="icon"
            ><component
              :is="components[reaction.category]"
              :isActive="isUsed(reaction.category)"
          /></span>
          <span class="meta-count">{{ reaction.count }}</span>
        </button>
        <button>
          <span class="icon"> <DropDownIcon /></span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import HeartIcon from '../icons/reactions/HeartIcon.vue';
import UnicornIcon from '../icons/reactions/UnicornIcon.vue';
import BookmarkIcon from '../icons/reactions/BookmarkIcon.vue';
import DropDownIcon from '../icons/reactions/DropDownIcon.vue';
import { onMounted, ref } from '@vue/runtime-core';
import axios from 'axios';

const articleReactionCounts = ref([
  {
    category: 'heart',
    count: 0,
  },
  {
    category: 'unicorn',
    count: 0,
  },
  {
    category: 'readingList',
    count: 0,
  },
]);

type Reaction = {
  id: number;
  user_id: number;
  post_id: number;
  category: string;
  created_at: string;
  updated_at: string;
};

const userReactions = ref<Reaction[]>([]);

onMounted(async () => {
  const { data } = await axios.get(
    'http://127.0.0.1:3333/reactions?article_id=1'
  );
  console.log({ data });
  articleReactionCounts.value = data.articleReactionCounts;
  userReactions.value = data.reactions;
});

const components = {
  like: HeartIcon,
  unicorn: UnicornIcon,
  readinglist: BookmarkIcon,
};

const randomNum = () => Math.floor(Math.random() * 50);

const isUsed = (category: string) =>
  userReactions.value.some(
    (userReaction) => userReaction.category === category
  );

const removeReaction = (category: string) => {
  userReactions.value = userReactions.value.filter(
    (userReaction) => userReaction.category !== category
  );

  const reaction = articleReactionCounts.value.find(
    (reaction) => reaction.category === category
  );
  reaction && reaction.count--;
};

const addReaction = (category: string, reaction: Reaction) => {
  userReactions.value.push(reaction);

  const reactionToAdd = articleReactionCounts.value.find(
    (reaction) => reaction.category === category
  );
  reactionToAdd && reactionToAdd.count++;
};

const handleClick = (category: string) => {
  console.log({ category });
  if (isUsed(category)) {
    axios
      .delete('http://127.0.0.1:3333/reactions', {
        data: {
          category,
          postId: 1, //todo: get post id from router
        },
      })
      .then(({ data }) => {
        if (data.result === 'deleted') {
          removeReaction(category);
        } else {
          throw new Error('Failed to delete reaction');
        }
      });
  } else {
    axios
      .post('http://127.0.0.1:3333/reactions', {
        category,
        postId: 1, //todo: get post id from router
      })
      .then(({ data }) => {
        if (data.result === 'created') {
          addReaction(category, data.reaction);
        } else {
          throw new Error('Failed to create reaction');
        }
      });
  }
};
</script>

<style scoped>
.sidebar-left {
  /* border: 1px solid sandybrown; */
  /* display: grid; */
  display: block;
  gap: 1rem;
  justify-content: stretch;
}
.sidebar-left button {
  display: flex;
  flex-direction: column;
  border: none;
  background-color: transparent;
  align-items: center;
  font-family: inherit;
  color: #bdbdbd;
  cursor: pointer;
}

.sidebar-left button:hover {
  color: #f9f9f9;
}
.sidebar-left button[name='like']:hover {
  --reaction-color: var(--reaction-like-color);
}
.sidebar-left button[name='unicorn']:hover {
  --reaction-color: var(--reaction-unicorn-color);
}
.sidebar-left button[name='readinglist']:hover {
  --reaction-color: var(--reaction-readinglist-color);
}
.sidebar-left button[name='like'] {
  --reaction-color: var(--button-ghost-color);
}
.sidebar-left button[name='unicorn'] {
  --reaction-color: var(--button-ghost-color);
}
.sidebar-left button[name='readinglist'] {
  --reaction-color: var(--button-ghost-color);
}
.sidebar-left button[name='like'][is-active='true'] {
  --reaction-color: var(--reaction-like-color);
}
.sidebar-left button[name='unicorn'][is-active='true'] {
  --reaction-color: var(--reaction-unicorn-color);
}
.sidebar-left button[name='readinglist'][is-active='true'] {
  --reaction-color: var(--reaction-readinglist-color);
}
.article-actions {
  padding: 0;
  display: grid;
  gap: 1.5rem;
  position: sticky;

  justify-content: stretch;
  top: calc(56px + 1rem + 6vh);
}
.article-actions-inner {
  display: grid;
  gap: 1rem;
  justify-content: stretch;
}
.meta-count {
  font-size: 0.875rem;
  font-weight: normal;

  line-height: 21px;
}
button[is-active='true'] .meta-count {
  color: var(--reaction-color);
}
.sidebar-left button .icon {
  padding: 0.5rem;
  color: var(--reaction-color);
  border-radius: 50%;
}
.sidebar-left button[name='like']:hover .icon {
  background-color: var(--reaction-like-bg);
}
.sidebar-left button[name='unicorn']:hover .icon {
  background-color: var(--reaction-unicorn-bg);
}
.sidebar-left button[name='readinglist']:hover .icon {
  background-color: var(--reaction-readinglist-bg);
}
.sidebar-left button[is-active='true'] .icon {
  box-shadow: inset 0 0 0 2px var(--reaction-color);
  border-radius: 50%;
}
</style>
