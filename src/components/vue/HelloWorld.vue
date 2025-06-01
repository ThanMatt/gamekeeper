<template>
  <div>
    <p>Counter: {{ count }}</p>
    <button @click="count++">+</button>
    <p>Total clicks: {{ totalClicks }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const totalClicks = ref(0);
</script>
