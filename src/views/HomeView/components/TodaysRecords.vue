<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import emitter from './eventBus'
import VerticalDotsMenu from './VerticalDotsMenu.vue'

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

const editRecord = (index) => {
  // Implement edit functionality
  console.log('Edit record at index:', index)
}

const deleteRecord = (index) => {
  records.value.splice(index, 1)
  saveRecords()
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
    <h2 class="records-header">Today's Records</h2>
    <div class="records-list-container">
      <div class="records-list" ref="recordsList">
        <div v-for="(record, index) in records" :key="index" class="record-item">
          <span class="record-time">{{ record.time }}</span>
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
  height: 300px;
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
