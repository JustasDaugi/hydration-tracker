<script setup>
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class="ok-button" @click="handleClick">OK</button>
</template>

<style scoped>
.ok-button {
  position: fixed;
  top: 90%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.ok-button:hover {
  background-color: #4a4a4a;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ok-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>