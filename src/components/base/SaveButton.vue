<script setup>
const emit = defineEmits(['save'])

const handleClick = () => {
  emit('save')
}
</script>

<template>
  <button class="save-button" @click="handleClick">Save</button>
</template>

<style scoped>
.save-button {
  position: fixed;
  top: 780px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  z-index: 1000;
}

.save-button:hover {
  background-color: #4a4a4a;
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.save-button:active {
  transform: translateX(-50%) translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
