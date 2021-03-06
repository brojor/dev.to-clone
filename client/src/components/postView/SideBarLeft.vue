<template>
  <aside class="sidebar-left">
    <div class="article-actions">
      <div class="article-actions-inner">
        <button
          v-for="(reaction, index) in articleReactionCounts"
          :key="index"
          @click="handleClick(reaction.category)"
          :name="reaction.category"
          :class="{ 'is-active': isUsed(reaction.category) }"
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
  user_id: number;
  category: string;
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
          reactableType: 'post',
          reactableId: 1, // todo: get this from props/state/router
          category,
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
        reactableType: 'post',
        reactableId: 1, // todo: get this from props/state/router
        category,
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

<style lang="scss">
$reactionTypes: 'like', 'unicorn', 'readinglist';

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

.sidebar-left {
  display: block;
  gap: 1rem;
  justify-content: stretch;
  button {
    display: flex;
    flex-direction: column;
    border: none;
    background-color: transparent;
    align-items: center;
    font-family: inherit;
    color: #bdbdbd;
    cursor: pointer;
    &:hover {
      color: #f9f9f9;
    }
    @each $type in $reactionTypes {
      &[name='#{$type}'] {
        &.is-active {
          --reaction-color: var(--reaction-#{$type}-color);
          .meta-count {
            color: var(--reaction-color);
          }
          .icon {
            box-shadow: inset 0 0 0 2px var(--reaction-color);
            border-radius: 50%;
          }
        }
        &:hover {
          --reaction-color: var(--reaction-#{$type}-color);
          .icon {
            background-color: var(--reaction-#{$type}-bg);
          }
        }
      }
    }
    .icon {
      padding: 0.5rem;
      color: var(--reaction-color);
      border-radius: 50%;
    }

    .meta-count {
      font-size: 0.875rem;
      font-weight: normal;
      line-height: 21px;
    }
  }
}
</style>
