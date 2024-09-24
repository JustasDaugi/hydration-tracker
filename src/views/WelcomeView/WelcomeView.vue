<script setup>
import { inject } from 'vue';
import HeaderText from '../WelcomeView/components/HeaderText.vue';
import BaseWeightInput from '../../components/base/BaseWeightInput.vue';
import BaseClockPicker from '../../components/base/BaseClockPicker.vue';
import OKButton from '../WelcomeView/components/OKButton.vue';
import { baseStorage } from '../../composables';

const { weight, wakeUpTime, sleepTime } = baseStorage();

const toggleViews = inject('toggleViews');

const handleOKClick = () => {
  console.log('Settings updated');
  toggleViews();
}
</script>

<template>
  <div class="settings-view-wrapper">
    <main class="settings-view">
      <HeaderText />
      <BaseWeightInput v-model="weight" />
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
