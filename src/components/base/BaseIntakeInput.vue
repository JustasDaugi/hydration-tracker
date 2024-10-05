<script setup>
import { computed } from 'vue'
import { calculateWaterIntake } from '../../stores/drinkTarget'

const { recommendedIntakeMl } = calculateWaterIntake()

const props = defineProps({
  selectedUnit: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const unitLabel = computed(() => 'ml')

const updateIntake = (event) => {
  const newIntake = parseInt(event.target.value, 10)
  emit('update:modelValue', newIntake)
}

const displayedIntake = computed(() => {
  return props.modelValue !== null && !isNaN(props.modelValue)
    ? props.modelValue
    : recommendedIntakeMl.value
})
</script>

<template>
  <div class="intake-input">
    <h3>Change Daily Intake</h3>
    <div class="input-wrapper">
      <input type="number" id="intake" :value="displayedIntake" @input="updateIntake" min="0" />
      <span class="unit">{{ unitLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.intake-input {
  position: fixed;
  top: 15%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 998;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

h3 {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1rem 0;
}

.input-wrapper {
  position: relative;
  display: inline-block;
}

input {
  font-size: 1.2rem;
  padding: 0.5rem;
  border: none;
  border-bottom: 2px solid #ccc;
  width: 100px;
  background-color: #333;
  color: white;
}

.unit {
  position: absolute;
  right: 0;
  bottom: 0.5rem;
  font-size: 1rem;
  color: white;
}
</style>
