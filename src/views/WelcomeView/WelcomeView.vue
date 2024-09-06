<script setup>
import HeaderText from './components/HeaderText.vue';
import BaseRadioButtons from '../../components/base/BaseRadioButtons.vue';
import BaseWeightInput from '../../components/base/BaseWeightInput.vue';
import BaseClockPicker from '../../components/base/BaseClockPicker.vue';
import { baseStorage } from '../../composables';

const { selectedUnit, weight, wakeUpTime, sleepTime } = baseStorage();
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
  </main>
</template>

<style scoped>
.welcome-view {
  padding-top: 120px;
}
</style>
