<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Start from '@/components/Start.vue'
</script>

<template>
    <div class="app-container">
      <ClientOnly>
        <Header />
        <Start />
        <Footer />
      </ClientOnly>
    </div>
</template>

<style lang="scss">
.app-container {
  min-height: 100vh;
  min-height: var(--app-height);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
