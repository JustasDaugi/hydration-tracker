import { computed } from 'vue'
import { baseStorage } from '../composables'

const ML_PER_KG = 31.7

function convertKgToLbs(kg) {
  return kg * 2.20462
}

function convertLbsToKg(lbs) {
  return lbs / 2.20462
}

function calculateWaterIntakeInMl(weightInKg) {
  return Math.round(weightInKg * ML_PER_KG)
}

function convertMlToOz(ml) {
  return ml / 29.5735
}

export function calculateWaterIntake() {
  const { weight, selectedUnit } = baseStorage()

  const weightInKg = computed(() => {
    const weightValue = parseFloat(weight.value || '0')
    return selectedUnit.value === 'imperial' ? convertLbsToKg(weightValue) : weightValue
  })

  const recommendedIntakeInMl = computed(() => {
    return calculateWaterIntakeInMl(weightInKg.value)
  })

  const recommendedIntakeInOz = computed(() => {
    return Math.round(convertMlToOz(recommendedIntakeInMl.value))
  })

  const weightInLbs = computed(() => convertKgToLbs(weightInKg.value))

  return {
    recommendedIntakeMl: recommendedIntakeInMl,
    recommendedIntakeOz: recommendedIntakeInOz,
    weightInLbs
  }
}
