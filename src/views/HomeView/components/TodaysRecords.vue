<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import emitter from './eventBus'

const records = ref([])
const lastSavedDate = ref('')
const recordsList = ref(null)

const addRecord = (record) => {
  checkAndResetRecords()
  records.value.push(record)
  saveRecords()
  nextTick(() => {
    if (recordsList.value) {
      recordsList.value.scrollTop = recordsList.value.scrollHeight
    }
  })
}

const saveRecords = () => {
  const currentDate = new Date().toDateString()
  localStorage.setItem('todaysRecords', JSON.stringify(records.value))
  localStorage.setItem('lastSavedDate', currentDate)
  lastSavedDate.value = currentDate
}

const loadRecords = () => {
  const savedRecords = localStorage.getItem('todaysRecords')
  const savedDate = localStorage.getItem('lastSavedDate')
  
  if (savedRecords && savedDate) {
    lastSavedDate.value = savedDate
    checkAndResetRecords()
    records.value = JSON.parse(savedRecords)
  }
}

const checkAndResetRecords = () => {
  const currentDate = new Date().toDateString()
  if (currentDate !== lastSavedDate.value) {
    records.value = []
    lastSavedDate.value = currentDate
  }
}

onMounted(() => {
  loadRecords()
  emitter.on('recordAdded', addRecord)
})

onUnmounted(() => {
  emitter.off('recordAdded', addRecord)
})

watch(records, () => {
  saveRecords()
}, { deep: true })
</script>

<template>
  <div class="todays-records">
    <h2 class="records-header"><strong>Today's Records</strong></h2>
    <div class="records-list-container">
      <div class="records-list" ref="recordsList">
        <div v-for="(record, index) in records" :key="index" class="record-item">
          <span class="record-time">{{ record.time }}</span>
          <span class="record-amount">{{ record.cupSize }}ml</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todays-records {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 300px;
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
  scrollbar-width: thin;
  scrollbar-color: #ced4da #f8f9fa;
}

.records-list::-webkit-scrollbar {
  width: 6px;
}

.records-list::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.records-list::-webkit-scrollbar-thumb {
  background-color: #ced4da;
  border-radius: 3px;
}

.record-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  background-color: #f8f9fa;
  padding: 16px;
}

.record-item:hover {
  background-color: #e9ecef;
}

.record-time, .record-amount {
  font-weight: 500;
}

.record-time {
  justify-self: start;
}

.record-amount {
  justify-self: center;
  grid-column: 2;
  font-weight: 600;
  color: #3498db;
}
</style>
