<script setup>
import { inject } from 'vue';
import DrinkTarget from './components/DrinkTarget.vue';

const showWelcomeView = inject('showWelcomeView');
</script>

<template>
  <div v-if="!showWelcomeView" class="home-view">
    <DrinkTarget />

  </div>
</template>

<style scoped>
.home-view {
  padding-top: 60px;
}
</style>
