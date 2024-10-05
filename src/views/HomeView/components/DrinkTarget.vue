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
  <div class="drink-target d-flex">
    <div class="main d-flex flex-column">
      <p class="text intake">{{ progress }}</p>
      <p class="text target-label"><strong>Daily Drink Target</strong></p>
      <AddButton :cupSize="selectedCupSize" @add="handleAdd" />
    </div>
  </div>
</template>

<style scoped>
.drink-target,
.main {
  width: 100%;
  justify-content: center;
  align-items: center;
}

.drink-target {
  height: 100%;
}

.main {
  height: 75%;
  flex-direction: column;
}

.text {
  color: #333;
  text-align: center;
}

.intake {
  font-size: calc(16px + 2vw);
  margin-bottom: 10px;
}

.target-label {
  font-size: calc(12px + 1vw);
  margin-bottom: 60px;
}

@media (min-width: 576px) {
  .main {
    width: 70vw;
    height: 52.5vw;
  }
}

@media (min-width: 768px) {
  .main {
    width: 45vw;
    height: 33.75vw;
  }
}

@media (min-width: 992px) {
  .main {
    width: 380px;
    height: 285px;
  }

  .intake {
    font-size: 28px;
  }

  .target-label {
    font-size: 18px;
  }
}

@media (max-width: 477px) and (max-height: 840px) {
  .main {
    width: 70vw;
    height: 52.5vw;
    border-width: 3px;
  }

  .intake {
    font-size: calc(14px + 2vw);
    margin-bottom: 5px;
  }

  .target-label {
    font-size: calc(10px + 1vw);
    margin-bottom: 40px;
  }
}
</style>
