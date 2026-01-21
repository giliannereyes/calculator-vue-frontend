<script setup lang="ts">
  import { ref } from "vue"
  import Calculator from "./components/Calculator.vue"
  import Log from "./components/Log.vue"

  type LogEntry = { expression: string; result: number }

  const entries = ref<LogEntry[]>([])

  function addToLog(entry: LogEntry) {
    entries.value.unshift(entry)
  }
</script>

<template>
  <main class="page">
    <header class="header">
      <img src="./assets/calculator-icon.png" alt="Calculator image" class="logo" />
      <h1>Calculator</h1>
      <p>A simple calculator.</p>
    </header>

    <section class="content">
       <Calculator @new-calculation="addToLog"/>
       <Log :entries="entries" />
    </section>
  </main>
</template>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 16px;
    padding-top: 30px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 16px;
    color: #ffffff;
  }

  .logo {
    width: 60px; 
    margin-bottom: 8px; 
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

</style>
