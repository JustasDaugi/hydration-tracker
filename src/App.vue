<script setup>
import { ref, provide } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import HeaderMenu from './layouts/HeaderMenu.vue';

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
</template>

<style scoped>

</style>
