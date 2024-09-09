<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import emitter from './eventBus'

const records = ref([])

const addRecord = (record) => {
  records.value.unshift(record)
  saveRecords()
}

const saveRecords = () => {
  localStorage.setItem('todaysRecords', JSON.stringify(records.value))
}

const loadRecords = () => {
  const savedRecords = localStorage.getItem('todaysRecords')
  if (savedRecords) {
    records.value = JSON.parse(savedRecords)
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
    <div class="records-list">
      <ul>
        <li v-for="(record, index) in records" :key="index">
          {{ record.time }} - {{ record.cupSize }}ml
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.todays-records {
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 25vh;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.records-header {
  font-size: 1.2em;
  padding: 10px;
  margin: 0;
  text-align: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.records-list {
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
  font-size: 0.9em;
}
</style>
