import { computed } from 'vue'
import { baseStorage } from '../composables'

const ML_PER_KG = 31.7

function calculateWaterIntakeInMl(weightInKg) {
  return Math.round(weightInKg * ML_PER_KG)
}

export function calculateWaterIntake() {
  const { weight, customIntake } = baseStorage()

  const weightInKg = computed(() => {
    return parseFloat(weight.value || '0')
  })

  const recommendedIntakeMl = computed(() => {
    return customIntake.value !== null && !isNaN(customIntake.value)
      ? customIntake.value
      : calculateWaterIntakeInMl(weightInKg.value)
  })

  return {
    recommendedIntakeMl,
    weightInKg
  }
}