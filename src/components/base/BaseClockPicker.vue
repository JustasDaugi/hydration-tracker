<script setup>
import { baseStorage } from '../../composables';
import { TimePicker } from 'vue-material-time-picker'
import 'vue-material-time-picker/dist/style.css'

const { wakeUpTime, sleepTime } = baseStorage();
const emits = defineEmits(['update:wakeUpTime', 'update:sleepTime'])

const updateWakeUpTime = (newTime) => {
  wakeUpTime.value = newTime
  emits('update:wakeUpTime', newTime)
}

const updateSleepTime = (newTime) => {
  sleepTime.value = newTime
  emits('update:sleepTime', newTime)
}
</script>

<template>
  <div class="clock-picker">
    <h3>Wake up & sleep</h3>
    <div class="time-inputs">
      <TimePicker
        v-model="wakeUpTime"
        @update:modelValue="updateWakeUpTime"
        :color="'#222'"
        :width="250"
      />
      <TimePicker
        v-model="sleepTime"
        @update:modelValue="updateSleepTime"
        :color="'#222'"
        :width="250"
      />
    </div>
  </div>
</template>

<style scoped>
.clock-picker {
  position: fixed;
  top: 60%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 997;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
}

h3 {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1rem 0;
}

.time-inputs {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
