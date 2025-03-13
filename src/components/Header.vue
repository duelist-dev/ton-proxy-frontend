<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>

<template>
  <header>
    <Logo />
    <div class="header-items">
      <LanguageSwitcher/>
      <ThemeSwitcher/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  align-items: center;
  width: 100%;
  max-width: 1120px;
  min-height: 68px;
  box-sizing: border-box;
  padding: 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .header-items {
    gap: 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
}
</style>
