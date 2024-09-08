<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentIntake: {
    type: Number,
    required: true
  },
  targetIntake: {
    type: Number,
    required: true
  }
})

const FULL_CIRCLE = 251.2
const SEGMENTS = 10

const progress = computed(() => {
  const segmentSize = props.targetIntake / SEGMENTS
  const filledSegments = Math.floor(props.currentIntake / segmentSize)
  return Math.min(filledSegments / SEGMENTS, 1)
})

const strokeDasharray = computed(() => {
  const filledLength = progress.value * FULL_CIRCLE
  return `${filledLength} ${FULL_CIRCLE}`
})
</script>

<template>
  <svg class="water-meter" viewBox="0 0 100 50">
    <path d="M5 45 A 40 40 0 1 1 95 45" fill="none" stroke="#e0e0e0" stroke-width="5" />
    <path
      d="M5 45 A 40 40 0 1 1 95 45"
      fill="none"
      stroke="#3498db"
      stroke-width="5"
      stroke-linecap="round"
      :stroke-dasharray="strokeDasharray"
    />
  </svg>
</template>

<style scoped>
.water-meter {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}

path {
  transition: stroke-dasharray 0.5s ease-in-out;
}
</style>
