<script setup>
import { ref, watch } from 'vue'
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

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const selectSize = (size) => {
  selectedCupSize.value = size
  isModalOpen.value = false
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
  <div class="switch-cup">
    <button @click="toggleModal" class="cup-button">
      {{ cupSizes.find((cup) => cup.size === selectedCupSize).icon }}
    </button>
    <div v-if="isModalOpen" class="cup-modal">
      <div class="cup-grid">
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
    </div>
  </div>
</template>

<style scoped>
.switch-cup {
  position: absolute;
  bottom: -160px;
  right: -200px;
  z-index: 10;
}

.cup-button {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
}

.cup-modal {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cup-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
