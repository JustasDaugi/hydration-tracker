<script setup>
import { ref, computed } from 'vue'
import { calculateWaterIntake } from '../../../stores/drinkTarget'
import { baseStorage } from '../../../composables'

const { recommendedIntakeMl, recommendedIntakeOz } = calculateWaterIntake ()
const { selectedUnit } = baseStorage()
const currentIntake = ref(0)

const progress = computed(() => {
  if (!recommendedIntakeMl.value || !recommendedIntakeOz.value) {
    return 'Calculating...'
  }
  
  if (selectedUnit.value === 'imperial') {
    return `${currentIntake.value}/${recommendedIntakeOz.value} oz`
  } else {
    return `${currentIntake.value}/${recommendedIntakeMl.value} ml`
  }
})
</script>

<template>
  <div class="drink-target">
    <div class="circle">
      <p class="intake">{{ progress }}</p>
      <p class="target-label"><strong>Daily Drink Target</strong></p>
    </div>
  </div>
</template>

<style scoped>
.drink-target {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 4px solid #3498db;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intake {
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.target-label {
  font-size: 18px;
  color: #333;
  text-align: center;
}
</style>
