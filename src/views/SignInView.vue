<script setup lang="ts">
  import SignInForm from '@/components/SignInForm.vue';
</script>

<template>
  <main class="page">
      <header class="header">
          <img src="@/assets/calculator-icon.png" alt="Calculator image" class="logo" />
          <h1>Sign in</h1>
          <p>If you are a new user, an account will be automatically created for you.</p>
      </header>
      <section class="content">
        <SignInForm />
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

  button[disabled] { 
    opacity: 0.6; 
    cursor: not-allowed; 
  }

  button {
    border-radius: 12px; 
    padding: 10px 10px; 
    font-size: 14px; 
    cursor: pointer; 
    user-select: none; 
    background: #363737;
    color: #fbfbfb;
    transition: transform 0.05s ease, filter 0.15s ease;
  }

  textarea {
    resize: none;
  }

</style>