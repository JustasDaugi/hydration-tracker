<script setup>
import { inject } from 'vue';
import HeaderText from './components/HeaderText.vue';
import BaseRadioButtons from '../../components/base/BaseRadioButtons.vue';
import BaseWeightInput from '../../components/base/BaseWeightInput.vue';
import BaseClockPicker from '../../components/base/BaseClockPicker.vue';
import OKButton from './components/OKButton.vue';
import { baseStorage } from '../../composables';

const { selectedUnit, weight, wakeUpTime, sleepTime } = baseStorage();

const toggleViews = inject('toggleViews');

const handleOKClick = () => {
  console.log('OK button clicked');
  toggleViews();
}
</script>

<template>
  <div class="welcome-view-wrapper">
    <main class="welcome-view">
      <HeaderText />
      <BaseRadioButtons v-model="selectedUnit" />
      <BaseWeightInput :selectedUnit="selectedUnit" v-model="weight" />
      <BaseClockPicker 
        v-model:wakeUpTime="wakeUpTime" 
        v-model:sleepTime="sleepTime" 
      />
    </main>
    <OKButton @click="handleOKClick" />
  </div>
</template>

<style scoped>
.welcome-view-wrapper {
  position: relative;
  min-height: 100vh;
  padding-bottom: 80px;
}

.welcome-view {
  padding-top: 120px;
}
</style>
