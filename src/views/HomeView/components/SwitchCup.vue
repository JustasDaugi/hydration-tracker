<script setup>
import { watch } from 'vue'
import emitter from './eventBus'
import { baseStorage } from '../../../composables'

const { selectedCupSize } = baseStorage()

const cupSizes = [
  { size: 100, icon: '🫖', name: 'Small tea cup' },
  { size: 125, icon: '🍵', name: 'Medium tea cup' },
  { size: 150, icon: '☕', name: 'Large tea cup' },
  { size: 175, icon: '🥛', name: 'Medium glass of water' },
  { size: 200, icon: '🥤', name: 'Recyclable coffee cup' },
  { size: 300, icon: '🍺', name: 'Beer mug' },
  { size: 400, icon: '🍶', name: 'Water bottle' }
]

const selectSize = (size) => {
  selectedCupSize.value = size
  emitter.emit('cupSizeChanged', size)
}

watch(
  selectedCupSize,
  (newSize) => {
    emitter.emit('cupSizeChanged', newSize)
  },
  { immediate: true }
)
</script>

<template>
  <div class="switch-cup-container">
    <button
      v-for="cup in cupSizes"
      :key="cup.size"
      @click="selectSize(cup.size)"
      :class="['cup-option', { selected: cup.size === selectedCupSize }]"
    >
      <span class="cup-icon">{{ cup.icon }}</span>
      <span class="cup-size">{{ cup.size }}ml</span>
    </button>
  </div>
</template>

<style scoped>
.switch-cup-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.cup-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cup-option.selected {
  background-color: #e0f7fa;
  border-color: #00bcd4;
}

.cup-icon {
  font-size: 1.5em;
}

.cup-size {
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
