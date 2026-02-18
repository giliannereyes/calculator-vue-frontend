<script setup lang="ts">
	import ContactForm from '@/components/ContactForm.vue';
</script>

<template>
    <main class="page">
        <header class="header">
            <img src="@/assets/calculator-icon.png" alt="Calculator image" class="logo" />
            <h1>Contact</h1>
            <p>Send feedback to the developer.</p>
            <RouterLink class="back-link" to="/calculator">Go To Calculator</RouterLink>
        </header>
        <section class="content">
            <ContactForm />
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

  .back-link {
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ffad33;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    opacity: 0.9;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .back-link::before {
    font-size: 16px; 
  }
  
  .back-link:hover {
    opacity: 1;
    transform: translateX(-2px);
  }
</style>
