<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { calculateWaterIntake } from '../../../stores/drinkTarget'
import { baseStorage } from '../../../composables'
import AddButton from './AddButton.vue'
import emitter from './eventBus'

const { recommendedIntakeMl } = calculateWaterIntake()
const { selectedCupSize, currentIntake, lastResetDate } = baseStorage()

const progress = computed(() => {
  if (!recommendedIntakeMl.value) return '0/0'
  return `${currentIntake.value}/${recommendedIntakeMl.value} ml`
})

const handleAdd = () => {
  const addedAmountMl = selectedCupSize.value
  currentIntake.value = Math.min(
    currentIntake.value + addedAmountMl,
    recommendedIntakeMl.value
  )
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  emitter.emit('recordAdded', { cupSize: selectedCupSize.value, time })
}

const resetIfNewDay = () => {
  const today = new Date().toDateString()
  if (lastResetDate.value !== today) {
    currentIntake.value = 0
    lastResetDate.value = today
  }
}

onMounted(() => {
  resetIfNewDay()
  emitter.on('cupSizeChanged', (size) => {
    selectedCupSize.value = size
  })
})

onUnmounted(() => {
  emitter.off('cupSizeChanged')
})

const intervalId = setInterval(resetIfNewDay, 60000)
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <div class="drink-target">
    <div class="circle">
      <p class="text intake">{{ progress }}</p>
      <p class="text target-label"><strong>Daily Drink Target</strong></p>
      <AddButton :cupSize="selectedCupSize" @add="handleAdd" />
    </div>
  </div>
</template>

<style scoped>
.drink-target,
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.drink-target {
  position: fixed;
  inset: 0;
}

.circle {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 4px solid #3498db;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.text {
  color: #333;
  text-align: center;
}

.intake {
  font-size: 28px;
  margin-bottom: 10px;
}

.target-label {
  font-size: 18px;
  margin-bottom: 60px;
}
</style>
