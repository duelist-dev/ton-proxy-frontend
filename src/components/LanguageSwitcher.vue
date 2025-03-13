<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { isClient } from '@vueuse/core'
import { ref } from 'vue'
import LanguageSvg from '@/assets/icons/language.svg?component'
import { useStorage } from '@vueuse/core'

const { locale } = useI18n()

const languageLocalStorage = useStorage('language', '')
if (isClient) {
  locale.value = languageLocalStorage.value ? languageLocalStorage.value : locale.value.split('-')[0] || 'en';
}
const languages = [
  {
    key: 'en',
    value: 'English',
  },
  {
    key: 'ru',
    value: 'Русский',
  },
]

const isOpen = ref(false)
const dropdown = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
}

const handleClickOutside = (event: Event) => {
  if (dropdown.value && !(dropdown.value as HTMLElement).contains(event.target as HTMLElement)) {
    isOpen.value = false;
    document.removeEventListener('click', handleClickOutside);
  }
}

const selectLanguage = (language: string) => {
  locale.value = language
  languageLocalStorage.value = language
  isOpen.value = false
}
</script>
<template>
  <div v-if="isClient" class="dropdown" ref="dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown" aria-label="Change language">
      <LanguageSvg class="icon" width="20" height="20" />
    </button>
    <transition name="fade">
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="language in languages" :key="language.key" @click="selectLanguage(language.key)" :class="{'selected': language.key == locale }">
        {{ language.value }}
      </li>
    </ul>
    </transition>
  </div>

</template>
<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  background-color: #fff;
  box-shadow: 0 4px 8px var(--box-shadow-color-default);
  box-sizing: border-box;
  color: var(--text-secondary);
  background: var(--background-content);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  transition: all var(--transition-default);
  overflow: hidden;
}

.dropdown-menu li {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  min-width: 120px;
  transition: all var(--transition-default);
  &:not(:last-child) {
    border-bottom: 1px solid var(--background-content-hover);
  }
  &.selected {
    color: var(--accent-default);
  }
  &:hover {
    background: var(--background-content-hover);
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

</style>
