<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import SunSvg from '@/assets/icons/sun.svg?component';
import MoonSvg from '@/assets/icons/moon.svg?component';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>
<template>
  <button @click="toggleDark()" aria-label="Toggle theme">
    <SunSvg class="icon" width="20" height="20" v-if="isDark"/>
    <MoonSvg class="icon" width="20" height="20" v-else/>
  </button>
</template>
<style lang="scss" scoped>
button {
  background: transparent;
  border: unset;
  padding: 6px;
  transition: all var(--transition-default);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: var(--background-content-hover);
  }
  .icon {
    color: var(--icon-secondary);
  }

}
</style>
