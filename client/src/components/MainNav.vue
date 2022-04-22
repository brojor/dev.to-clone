<template>
  <nav class="main-nav">
    <ul>
      <li v-for="navItem in mainNavItems" :key="`nav-item-${navItem.id}`">
        <a href="">
          <component :is="navItem.component" class="nav-icon" />
          {{ navItem.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import NavHome from './icons/nav/NavHome.vue';
import NavReadingList from './icons/nav/NavReadingList.vue';
import NavListings from './icons/nav/NavListings.vue';
import NavPodcasts from './icons/nav/NavPodcasts.vue';
import NavVideos from './icons/nav/NavVideos.vue';
import NavTags from './icons/nav/NavTags.vue';
import NavFAQ from './icons/nav/NavFAQ.vue';
import NavForemShop from './icons/nav/NavForemShop.vue';
import NavSponsors from './icons/nav/NavSponsors.vue';
import NavAbout from './icons/nav/NavAbout.vue';
import NavContact from './icons/nav/NavContact.vue';

const mainNavItems = [
  {
    id: 0,
    name: 'Home',
    component: NavHome,
  },
  {
    id: 1,
    name: 'Reading List',
    component: NavReadingList,
  },
  {
    id: 2,
    name: 'Listings',
    component: NavListings,
  },
  {
    id: 3,
    name: 'Podcasts',
    component: NavPodcasts,
  },
  {
    id: 4,
    name: 'Videos',
    component: NavVideos,
  },
  {
    id: 5,
    name: 'Tags',
    component: NavTags,
  },
  {
    id: 6,
    name: 'FAQ',
    component: NavFAQ,
  },
  {
    id: 7,
    name: 'Forem Shop',
    component: NavForemShop,
  },
  {
    id: 8,
    name: 'Sponsors',
    component: NavSponsors,
  },
  {
    id: 9,
    name: 'About',
    component: NavAbout,
  },
  {
    id: 10,
    name: 'Contact',
    component: NavContact,
  },
];
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: rgb(212, 212, 212);
  display: flex;
  padding: 0.5rem 1rem;

  border-radius: var(--radius);
  font-size: 1rem;
  cursor: pointer;
  outline: 0;
  line-height: 1.5rem;
  /* max-width: 100%; */
}
a:hover {
  color: rgb(165, 180, 252);
  text-decoration: underline;
  background-color: rgba(49, 46, 129, 0.75);
  border-radius: 0.375rem;
}

.nav-icon {
  margin-right: 0.5rem;
  margin-left: -0.5rem;
}
</style>
