<template>
    <div class="vertical-dots-menu">
      <button @click="toggleMenu" class="dots-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="2" r="2"/>
          <circle cx="8" cy="8" r="2"/>
          <circle cx="8" cy="14" r="2"/>
        </svg>
      </button>
      <div v-if="isMenuOpen" class="menu-options">
        <button @click="$emit('edit')">Edit</button>
        <button @click="$emit('delete')">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  defineEmits(['edit', 'delete']);
  </script>
  
  <style scoped>
  .vertical-dots-menu {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }
  
  .dots-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #495057;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .menu-options {
    position: absolute;
    right: 100%;
    top: 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    z-index: 10;
    width: 100px;
  }
  
  .menu-options button {
    display: block;
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .menu-options button:hover {
    background-color: #f8f9fa;
  }
  </style>
  