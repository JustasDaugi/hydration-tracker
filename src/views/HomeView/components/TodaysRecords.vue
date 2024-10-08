<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useStorage } from '@vueuse/core'
import emitter from './eventBus'
import VerticalDotsMenu from './VerticalDotsMenu.vue'
import { baseStorage } from '../../../composables'

const records = useStorage('todaysRecords', [])
const lastResetDate = useStorage('lastResetDate', '')
const recordsList = ref(null)
const { currentIntake } = baseStorage()

const addRecord = (record) => {
  checkAndResetRecords()
  records.value.push({ ...record, date: new Date().toISOString() })
  nextTick(() => {
    if (recordsList.value) {
      recordsList.value.scrollTop = recordsList.value.scrollHeight
    }
  })
}

const checkAndResetRecords = () => {
  const currentDate = new Date().toDateString()
  if (currentDate !== lastResetDate.value) {
    records.value = []
    currentIntake.value = 0
    lastResetDate.value = currentDate
  } else {
    records.value = records.value.filter(
      (record) => new Date(record.date).toDateString() === currentDate
    )
  }
}

const editRecord = (index) => {
  console.log('Edit record at index:', index)
}

const deleteRecord = (index) => {
  records.value.splice(index, 1)
}

onMounted(() => {
  checkAndResetRecords()
  emitter.on('recordAdded', addRecord)
})

onUnmounted(() => {
  emitter.off('recordAdded', addRecord)
})

const intervalId = setInterval(checkAndResetRecords, 60000)
onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <div class="todays-records">
    <h2 class="records-header">Today's Records</h2>
    <div class="records-list-container">
      <div class="records-list" ref="recordsList">
        <div v-for="(record, index) in records" :key="index" class="record-item">
          <span class="record-time">{{ new Date(record.date).toLocaleTimeString() }}</span>
          <span class="record-amount">{{ record.cupSize }}ml</span>
          <VerticalDotsMenu
            @edit="editRecord(index)"
            @delete="deleteRecord(index)"
            class="record-menu"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todays-records {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 310px;
  position: relative;
}

.records-header {
  background-color: #f8f9fa;
  padding: 16px;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
  flex-shrink: 0;
}

.records-list-container {
  flex-grow: 1;
  overflow: hidden;
}

.records-list {
  height: 100%;
  overflow-y: auto;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e9ecef;
  position: relative;
}

.record-item:last-child {
  border-bottom: none;
}

.record-time {
  flex: 1;
}

.record-amount {
  flex: 2;
  text-align: center;
  color: #3498db;
  transform: translateX(-20%);
}

.record-menu {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
