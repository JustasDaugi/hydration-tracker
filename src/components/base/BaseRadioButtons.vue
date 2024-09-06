<script setup>
import { baseStorage } from '../../composables'

const { selectedUnit } = baseStorage()

defineProps({
  groupLabel: {
    type: String,
    default: 'Choose unit'
  }
})

const emits = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  selectedUnit.value = value
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="radio-group">
    <h3>{{ groupLabel }}</h3>
    <div class="radio-options">
      <div class="radio-option">
        <input
          type="radio"
          id="imperial"
          value="imperial"
          v-model="selectedUnit"
          @change="updateValue('imperial')"
        />
        <label for="imperial">oz/lb</label>
      </div>
      <div class="radio-option">
        <input
          type="radio"
          id="metric"
          value="metric"
          v-model="selectedUnit"
          @change="updateValue('metric')"
        />
        <label for="metric">ml/kg</label>
      </div>
    </div>
    <p class="selected-unit">Selected unit system: {{ selectedUnit }}</p>
  </div>
</template>

<style scoped>
.radio-group {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
}

h3,
.selected-unit {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.selected-unit {
  font-size: 1.25rem;
  transition: margin-top 0.3s ease;
}

.radio-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
}

input[type='radio'] {
  width: 1.4rem;
  height: 1.4rem;
}

label {
  margin-left: 0.5rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .selected-unit {
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
}
</style>
