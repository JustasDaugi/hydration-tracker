<script setup>
import { onMounted, onUnmounted } from 'vue'
import emitter from './eventBus'
import { baseStorage } from '../../../composables'

const { selectedCupSize } = baseStorage()

const emit = defineEmits(['add'])

const handleClick = () => {
  emit('add')
}

onMounted(() => {
  emitter.on('cupSizeChanged', (size) => {
    selectedCupSize.value = size
  })
})

onUnmounted(() => {
  emitter.off('cupSizeChanged')
})
</script>

<template>
  <div class="add-button">
    <span class="amount">{{ selectedCupSize }}ml</span>
    <button @click="handleClick" class="plus-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.add-button,
.plus-button {
  display: flex;
  align-items: center;
}

.add-button {
  flex-direction: column;
  position: absolute;
  bottom: 20px;
}

.amount {
  font-size: 16px;
  margin-bottom: 5px;
}

.plus-button {
  background-color: #3498db;
  border: none;
  border-radius: 50%;
  color: white;
  width: 40px;
  height: 40px;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.plus-button:hover {
  background-color: #2980b9;
}
</style>
