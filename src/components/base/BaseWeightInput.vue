<script setup>
import { computed } from 'vue'
import { baseStorage } from '../../composables'

const { weight } = baseStorage()

const props = defineProps({
  selectedUnit: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const unitLabel = computed(() => (props.selectedUnit === 'imperial' ? 'lb' : 'kg'))

const updateWeight = (event) => {
  weight.value = event.target.value
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="weight-input">
    <h3>Weight</h3>
    <div class="input-wrapper">
      <input type="number" id="weight" :value="weight" @input="updateWeight" />
      <span class="unit">{{ unitLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.weight-input {
  position: fixed;
  top: 30%;
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
  border: 2px solid #ccc;
  width: 100px;
  color: black;
}

.unit {
  position: absolute;
  right: 0;
  bottom: 0.5rem;
  font-size: 1rem;
  color: white;
}
</style>
