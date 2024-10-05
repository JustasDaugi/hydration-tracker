<script setup>
import { ref, watch } from 'vue'
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
  { size: 400, icon: 'mdi-beer', name: 'Water bottle' }
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

const showCustomDialog = ref(false)
const customSize = ref('')

const openCustomDialog = () => {
  showCustomDialog.value = true
}

const saveCustomSize = () => {
  if (customSize.value && !isNaN(customSize.value)) {
    selectSize(parseInt(customSize.value))
  }
  showCustomDialog.value = false
  customSize.value = ''
}
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
    
    <v-btn
      @click="openCustomDialog"
      variant="outlined"
      class="cup-option custom-size-button"
      density="compact"
      size="small"
    >
      <v-icon size="small">mdi-pencil</v-icon>
      <span class="cup-size">Customize</span>
    </v-btn>

    <v-dialog v-model="showCustomDialog" max-width="300px">
      <v-card>
        <v-card-title>Custom Cup Size</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="customSize"
            label="Enter size in ml"
            type="number"
            suffix="ml"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showCustomDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveCustomSize">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  width: 40px;
  height: 60px;
}

.custom-size-button {
  width: 60px;
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

