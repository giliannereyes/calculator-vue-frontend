<template>
  <RouterView />
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
