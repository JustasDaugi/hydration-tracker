<script setup>
import { ref, provide } from 'vue';
import { RouterView } from 'vue-router';
import HeaderMenu from './layouts/HeaderMenu.vue';
import HomeView from './views/HomeView/HomeView.vue';

const showHeader = ref(false);
const showWelcomeView = ref(true);

provide('showHeader', showHeader);
provide('showWelcomeView', showWelcomeView);

const toggleViews = () => {
  showHeader.value = true;
  showWelcomeView.value = false;
};

provide('toggleViews', toggleViews);
</script>

<template>
  <HeaderMenu v-if="showHeader" />
  <RouterView v-if="showWelcomeView" />
  <HomeView v-if="!showWelcomeView" />
</template>

<style scoped>

</style>
