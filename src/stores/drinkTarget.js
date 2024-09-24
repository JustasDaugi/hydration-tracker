import { computed } from 'vue'
import { baseStorage } from '../composables'

const ML_PER_KG = 31.7

function calculateWaterIntakeInMl(weightInKg) {
  return Math.round(weightInKg * ML_PER_KG)
}

export function calculateWaterIntake() {
  const { weight } = baseStorage()

  const weightInKg = computed(() => {
    return parseFloat(weight.value || '0')
  })

  const recommendedIntakeInMl = computed(() => {
    return calculateWaterIntakeInMl(weightInKg.value)
  })

  return {
    recommendedIntakeMl: recommendedIntakeInMl,
    weightInKg
  }
}
