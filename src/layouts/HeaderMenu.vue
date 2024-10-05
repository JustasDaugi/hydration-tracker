<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuItems = ref([
  { label: 'Home', route: '/' },
  { label: 'History', route: '/history' },
  { label: 'Settings', route: '/settings' }
]);

const navigateTo = (route) => {
  router.push(route);
};
</script>

<template>
  <header class="header-menu">
    <nav>
      <ul>
        <li 
          v-for="item in menuItems" 
          :key="item.label" 
          @click="navigateTo(item.route)"
        >
          {{ item.label }}
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #058cca;
  color: white;
  padding: 1rem;
  z-index: 1000;
}

nav ul {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  cursor: pointer;
  font-size: 1.5rem;
  flex: 1;
  text-align: center;
}
</style>
