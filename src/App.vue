<script setup>
import { ref, provide, watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import HeaderMenu from './layouts/HeaderMenu.vue';
import HomeView from './views/HomeView/HomeView.vue';

const router = useRouter();
const showHeader = ref(false);
const showWelcomeView = ref(true);

provide('showHeader', showHeader);
provide('showWelcomeView', showWelcomeView);

const toggleViews = () => {
  showHeader.value = true;
  showWelcomeView.value = false;
  localStorage.setItem('hasVisited', 'true');
};

provide('toggleViews', toggleViews);

watch(() => router.currentRoute.value, (newRoute) => {
  const hasVisited = localStorage.getItem('hasVisited');
  if (hasVisited || newRoute.path === '/settings') {
    showHeader.value = true;
    showWelcomeView.value = false;
  }
}, { immediate: true });
</script>

<template>
  <HeaderMenu v-if="showHeader" />
  <RouterView v-if="showWelcomeView || $route.path === '/settings'" />
  <HomeView v-if="!showWelcomeView && $route.path !== '/settings'" />
</template>
