<script setup lang="ts"></script>

<template>
  <form class="card">
    <div class="field">
      <label for="username">Username</label>
      <input id="email" type="email" />
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input id="email" type="password" />
    </div>
    
    <button type="submit"> Sign in </button>
  </form>
</template>

<style scoped>
    .card { 
        width: min(92vw, 420px); 
        padding: 16px; 
        border-radius: 16px; 
        color: #fbfbfb;
    }
    
    .field { 
        margin-bottom: 12px; 
        display: flex; 
        flex-direction: column; 
        gap: 6px; 
    }
</style>