<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { calculateWaterIntake } from '../../../stores/drinkTarget'
import { baseStorage } from '../../../composables'
import AddButton from './AddButton.vue'
import WaterMeter from './WaterMeter.vue'
import emitter from './eventBus'

const { recommendedIntakeMl, recommendedIntakeOz } = calculateWaterIntake()
const { selectedUnit, selectedCupSize } = baseStorage()
const currentIntake = ref(0)

const targetIntake = computed(
  () =>
    ({
      imperial: recommendedIntakeOz.value,
      metric: recommendedIntakeMl.value
    })[selectedUnit.value]
)

const unit = computed(
  () =>
    ({
      imperial: 'oz',
      metric: 'ml'
    })[selectedUnit.value]
)

const progress = computed(() =>
  targetIntake.value
    ? `${currentIntake.value}/${targetIntake.value} ${unit.value}`
    : 'Calculating...'
)

const handleAdd = () => {
  currentIntake.value = Math.min(currentIntake.value + selectedCupSize.value, targetIntake.value)
}

onMounted(() => {
  emitter.on('cupSizeChanged', (size) => {
    selectedCupSize.value = size
  })
})

onUnmounted(() => {
  emitter.off('cupSizeChanged')
})
</script>

<template>
  <div class="drink-target">
    <div class="circle">
      <WaterMeter :currentIntake="currentIntake" :targetIntake="targetIntake || 1" />
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
