<script setup>
import { watch } from 'vue'
import emitter from './eventBus'
import { baseStorage } from '../../../composables'

const { selectedCupSize } = baseStorage()

const cupSizes = [
  { size: 100, icon: 'mdi-coffee-outline', name: 'Small tea cup' },
  { size: 125, icon: 'mdi-coffee', name: 'Medium tea cup' },
  { size: 150, icon: 'mdi-coffee', name: 'Large tea cup' },
  { size: 175, icon: 'mdi-glass-mug-variant', name: 'Medium glass of water' },
  { size: 200, icon: 'mdi-cup', name: 'Recyclable coffee cup' },
  { size: 300, icon: 'mdi-beer', name: 'Beer mug' },
  { size: 400, icon: 'mdi-bottle-water', name: 'Water bottle' }
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
    <v-btn
      v-for="cup in cupSizes"
      :key="cup.size"
      @click="selectSize(cup.size)"
      :color="cup.size === selectedCupSize ? 'primary' : ''"
      variant="outlined"
      class="cup-option"
      density="compact"
      size="small"
    >
      <v-icon size="small">{{ cup.icon }}</v-icon>
      <span class="cup-size">{{ cup.size }}ml</span>
    </v-btn>
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
  min-width: 0;
  width: 60px;
  height: 60px;
}

.cup-size {
  font-size: 0.7em;
  margin-top: 2px;
}

:deep(.v-btn__content) {
  flex-direction: column;
  padding: 4px;
}
</style>
