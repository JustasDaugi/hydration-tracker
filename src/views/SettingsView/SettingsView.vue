<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

import BaseWeightInput from '../../components/base/BaseWeightInput.vue'
import BaseClockPicker from '../../components/base/BaseClockPicker.vue'
import BaseIntakeInput from '../../components/base/BaseIntakeInput.vue'
import SaveButton from '../../components/base/SaveButton.vue'
import { baseStorage } from '../../composables'

const { weight, wakeUpTime, sleepTime, selectedUnit, customIntake } = baseStorage()

const router = useRouter()
const toggleViews = inject('toggleViews')
const handleSave = () => {
  console.log('Settings saved')

  toggleViews()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="settings-view-wrapper">
    <main class="settings-view">
      <BaseIntakeInput v-model="customIntake" :selectedUnit="selectedUnit" />
      <BaseWeightInput v-model="weight" :selectedUnit="selectedUnit" />

      <BaseClockPicker v-model:wakeUpTime="wakeUpTime" v-model:sleepTime="sleepTime" />
      <SaveButton @save="handleSave" />
    </main>
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
