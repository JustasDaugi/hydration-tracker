<script setup>
import { inject } from 'vue';
import BaseWeightInput from '../../components/base/BaseWeightInput.vue';
import BaseClockPicker from '../../components/base/BaseClockPicker.vue';
import OKButton from '../WelcomeView/components/OKButton.vue';
import { baseStorage } from '../../composables';
import { useRouter } from 'vue-router';

const { weight, wakeUpTime, sleepTime, selectedUnit } = baseStorage();
const router = useRouter();

const toggleViews = inject('toggleViews');

const handleOKClick = () => {
  console.log('Settings updated');
  toggleViews();
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="settings-view-wrapper">
    <main class="settings-view">
      <BaseWeightInput v-model="weight" :selectedUnit="selectedUnit" />
      <BaseClockPicker 
        v-model:wakeUpTime="wakeUpTime" 
        v-model:sleepTime="sleepTime" 
      />
    </main>
    <OKButton @click="handleOKClick" />
  </div>
</template>

<style scoped>
.settings-view-wrapper {
  position: relative;
  min-height: 100vh;
  padding-bottom: 80px;
}

.settings-view {
  padding-top: 120px;
}
</style>
