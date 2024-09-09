<script setup>
import { inject } from 'vue'
import DrinkTarget from './components/DrinkTarget.vue'
import TodaysRecords from './components/TodaysRecords.vue'
import SwitchCup from './components/SwitchCup.vue'

const showWelcomeView = inject('showWelcomeView')
</script>

<template>
  <div v-if="!showWelcomeView" class="home-view">
    <div class="drink-target-wrapper">
      <DrinkTarget />
      <div class="switch-cup-wrapper">
        <SwitchCup />
      </div>
    </div>
    <TodaysRecords class="todays-records-wrapper" />
  </div>
</template>

<style scoped>
.home-view {
  padding-top: 60px;
  position: relative;
  min-height: 100vh;
}

.drink-target-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-10%); /* Move the entire wrapper upwards */
}

.switch-cup-wrapper {
  position: absolute;
  bottom: 220px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
}

.todays-records-wrapper {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  max-width: 90%;
}
</style>
