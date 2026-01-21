<script>
    export default {
        name: "Log",
        props: {
            entries: {
                type: Array, 
                required: true
            }
        }
    }
</script>

<template>
    <section class="log">
        <h2 class="title">Calculation Log</h2>
        <div class="box">
            <ul v-if="entries.length" class="list">
                <li v-for="(entry, i) in entries" :key="i" class="item">
                    <span class="eq">{{ entry.expression }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ entry.result }}</span>
                </li>
            </ul>
            <p v-else class="empty">No calculations yet.</p>
        </div>
    </section>
</template>

<style scoped>
    .log {
        width: min(92vw, 420px); 
        margin: 0 auto; 
    }

    .title {
        margin: 0 0 8px; 
        font-size: 16px; 
        color: #fbfbfb; 
    }

    .box {
        border: 1px solid rgba(255, 255, 255, 0.08); 
        border-radius: 12px; 
        background: #181818; 
        box-shadow: 0 10px 25px rgba(0,0,0, 0.25); 
        padding: 10px; 
        max-height: 180px; 
        overflow-y: auto; 
    }

    .list {
        list-style: none; 
        padding: 0; 
        margin: 0; 
    }

    .item {
        display: flex; 
        gap: 8px; 
        padding: 8px 6px; 
        border-radius: 10px; 
        color: #fbfbfb; 
    }

    .item + .item {
        border-top: 1px solid rgba(255, 255, 255, 0.06); 
    }

    .eq {
        flex: 1; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        white-space: nowrap; 
    }

    .equals {
        opacity: 0.7; 
    }

    .result {
        font-weight: 700; 
    }

    .empty {
        margin: 0; 
        color: rgba(255, 255, 255, 0.7); 
        padding: 8px 6px; 
    }
</style>