<template>
  <header class="header-text">
    <div class="container">
      <h1>Please provide some information before we get started</h1>
    </div>
  </header>
</template>

<style scoped>
.header-text {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #222;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  font-size: 1.25rem;
  margin: 0;
  text-align: center;
}

@media (min-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
