<script setup lang="ts">
    import { computed, ref } from "vue"
    import { useContactStore } from "../stores/contact"

    const store = useContactStore()
    const message = ref("")
    const status = ref<"" | "success" | "error">("")
    const statusText = ref("")
    const isSubmitting = ref(false)

    const nameError = computed(() => (store.name.trim() ? "" : "Name is required."))
    const emailError = computed(() => {
        const v = store.email.trim()
        if (!v) return "Email is required."
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        return ok ? "" : "Email is invalid"
    })
    const messageError = computed(() =>
        message.value.trim() ? "" : "Message is required."
    )
    const isValid = computed(() =>
        !nameError.value && !emailError.value && !messageError.value
    )

    async function onSubmit() {
        status.value = ""
        statusText.value = ""

        if (!isValid.value) return

        isSubmitting.value = true
        try {
            const res = await fetch("http://localhost:3000/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    name: store.name,
                    email: store.email,
                    message: message.value
                })
            })

            if (!res.ok) throw new Error("Bad response.")

            status.value = "success"
            statusText.value = "Success! Thank you for your feedback."
            message.value = ""
        } catch (e) {
            status.value = "error"
            statusText.value = "Something went wrong. Please try again."
        } finally {
            isSubmitting.value = false
        }
    }
</script>

<template>
    <form class="card" @submit.prevent="onSubmit">
        <div class="field">
            <label for="name">Name</label>
            <input id="name" v-model="store.name" type="text" />
            <p class="error" :class="{ hidden: !nameError }"> {{ nameError }}</p>
        </div>

        <div class="field">
            <label for="email">Email</label>
            <input id="email" v-model="store.email" type="email" />
            <p class="error" :class="{ hidden: !emailError }">{{ emailError }}</p>
        </div>

        <div class="field">
            <label for="message">Message</label>
            <textarea id="message" v-model="message" rows="4"></textarea>
            <p class="error" :class="{ hidden: !messageError }">{{ messageError }}</p>
        </div>

        <button type="submit" :disabled="!isValid || isSubmitting">
            {{  isSubmitting ? "Sending..." : "Submit" }}
        </button>

        <p v-if="statusText" :class="['status', status]">
            {{ statusText }}
        </p>
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

    .error {
        font-size: 12px;
        min-height: 16px; 
        margin: 0;
        color: #ffb4a9;
    }

    .error.hidden {
        visibility: hidden; 
    }

    .status {
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
        animation: fadeIn 0.15s ease-out;
    }

    .status.success {
        background: rgba(46, 160, 67, 0.15);   
        border: 1px solid rgba(46, 160, 67, 0.45);
        color: #9be9a8;
    }

    .status.error {
        background: rgba(248, 81, 73, 0.15);   
        border: 1px solid rgba(248, 81, 73, 0.45);
        color: #ffb4a9;
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

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-2px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>