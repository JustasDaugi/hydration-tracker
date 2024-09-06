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
  <main class="welcome-view">
    <HeaderText />
    <BaseRadioButtons v-model="selectedUnit" />
    <BaseWeightInput :selectedUnit="selectedUnit" v-model="weight" />
    <BaseClockPicker 
      v-model:wakeUpTime="wakeUpTime" 
      v-model:sleepTime="sleepTime" 
    />
    <div class="button-container">
      <OKButton @click="handleOKClick" />
    </div>
  </main>
</template>

<style scoped>
.welcome-view {
  padding-top: 120px;
  position: relative;
}

.button-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
