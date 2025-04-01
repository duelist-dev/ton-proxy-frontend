<script setup lang="ts">
import SearchSvg from '@/assets/icons/search.svg?component'
import HistorySvg from '@/assets/icons/history.svg?component'
import CloseSvg from '@/assets/icons/close.svg?component'
import { onMounted, ref } from 'vue'
import { useElementBounding, useStorage } from '@vueuse/core'
import { vResizeObserver } from '@vueuse/components'
import { wait } from '@/utils/helpers.ts'
import { useConfig } from '@/utils/useConfig.ts'

const search = ref('')
const searchContainer = ref(null)
const searchInput = ref(null)
const searchSuffix = ref(null)
const suffixHelper = ref(null)
const resetIcon = ref(null)
const searchSuggestions = ref(null)
const isOpenSuggestions = ref(false)
const suggestions = useStorage('suggestions', new Set())

const config = useConfig()
const DOMAIN_PROXY_URL = config.get('VITE_DOMAIN_PROXY_URL')

onMounted(() => {
  focusSearch()
})

const domainToString = (domain: string) => {
  let value = domain
  value = value?.startsWith('tonsite://') ? value?.slice(10) : value
  value = value?.startsWith('ton://') ? value?.slice(6) : value
  value = value?.endsWith('.ton') ? value?.slice(0, -4) : value
  return value
}

const validateSearch = (event: InputEvent) => {
  const validCharsRegex = /^[а-яА-ЯёЁa-zA-Z0-9-]+$/
  const input = event.target as HTMLInputElement
  const currentValue = input.value
  const data = domainToString(event.data || '')
  if (data && !validCharsRegex.test(String(data))) {
    event.preventDefault()
    return
  }
  const newValue = domainToString(
    currentValue.slice(0, input.selectionStart!) +
      (data || '') +
      currentValue.slice(input.selectionEnd!) || '',
  )
  if (newValue && !validCharsRegex.test(newValue)) {
    event.preventDefault()
  }
}

const focusSearch = () => {
  ;(searchInput.value! as HTMLInputElement).focus()
}

const handleSearch = async (event: InputEvent) => {
  const value = (event.target as HTMLInputElement).value
  search.value = domainToString(value)
  setSuffix()
}

const resetSearch = () => {
  search.value = ''
  setSuffix()
  focusSearch()
}

const setSuffix = () => {
  const value = search.value
  const suffixHelperDimensions = useElementBounding(suffixHelper) || null
  const searchSuffixDimensions = useElementBounding(searchSuffix) || null
  const resetIconDimensions = useElementBounding(resetIcon) || null
  const searchSuffixEl = searchSuffix.value! as HTMLElement
  if (searchSuffixEl) {
    if (value.length) {
      searchSuffixEl.style.left = suffixHelperDimensions.width.value + 'px'
      if (
        searchSuffixDimensions.x.value >
        resetIconDimensions.x.value - searchSuffixDimensions.width.value
      ) {
        searchSuffixEl.style.visibility = 'hidden'
      } else {
        searchSuffixEl.style.visibility = 'visible'
      }
    } else {
      searchSuffixEl.style.left = 0 + 'px'
      searchSuffixEl.style.visibility = 'hidden'
    }
  }
}

const prepareSuggestions = (): string[] => {
  return Array.from(suggestions.value).slice().reverse().slice(0, 4) as string[]
}

const addSuggestion = (value: string) => {
  deleteSuggestion(value)
  suggestions.value.add(value)
}

const deleteSuggestion = (value: string) => {
  if (suggestions.value.has(value)) {
    suggestions.value.delete(value)
  }
}

const onClickSuggestion = (value: string, event: Event) => {
  if (
    event &&
    (event.target as HTMLElement).classList.contains(
      'search-container_suggestions-container_item-reset-icon',
    )
  ) {
    event.preventDefault()
  } else {
    addSuggestion(value)
    resetSearch()
  }
}

const onEnterSearch = () => {
  if (search.value.length >= 4) {
    window.open(`https://${search.value}.${DOMAIN_PROXY_URL}`, '_blank')
    addSuggestion(search.value)
    resetSearch()
  }
}

const onFocusSearch = () => {
  isOpenSuggestions.value = true
  document.addEventListener('click', handleClickOutside)
}

const handleClickOutside = (event: Event) => {
  if (
    searchContainer.value &&
    !(searchContainer.value as HTMLElement).contains(event.target as HTMLElement)
  ) {
    isOpenSuggestions.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}
</script>

<template>
  <div class="search-container" ref="searchContainer">
    <div class="search-container_input-container">
      <SearchSvg class="search-container_input-container_search-icon" />
      <input
        ref="searchInput"
        class="search-container_input-container_input"
        type="text"
        @keydown.space.prevent
        :placeholder="$t('search.inputPlaceholder')"
        v-resize-observer="setSuffix"
        v-model="search"
        @beforeinput="validateSearch($event as InputEvent)"
        @input="handleSearch($event as InputEvent)"
        @keyup.enter="onEnterSearch()"
        @focus="onFocusSearch()"
      />
      <div ref="searchSuffix" class="search-container_input-container_suffix">.ton</div>
      <CloseSvg
        ref="resetIcon"
        v-if="search.length"
        class="search-container_input-container_reset-icon"
        @click="
          async () => {
            await wait(0)
            resetSearch()
          }
        "
      />
      <div
        ref="suffixHelper"
        v-text="domainToString(search)"
        class="search-container_input-container_suffix-helper"
      ></div>
    </div>

    <transition name="fade">
      <div
        ref="searchSuggestions"
        v-if="isOpenSuggestions && suggestions.size"
        class="search-container_suggestions-container"
      >
        <a
          class="search-container_suggestions-container_item"
          target="_blank"
          v-for="suggestion of prepareSuggestions()"
          @click="onClickSuggestion(suggestion, $event)"
          :href="`https://${suggestion}.${DOMAIN_PROXY_URL}`"
          :key="suggestion"
        >
          <HistorySvg class="search-container_suggestions-container_item-history-icon" />
          <div class="search-container_suggestions-container_item-text">
            <span>{{ suggestion }}</span>
          </div>
          <CloseSvg
            class="search-container_suggestions-container_item-reset-icon"
            @click="
              async () => {
                await wait(0)
                deleteSuggestion(suggestion)
              }
            "
          />
        </a>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;
  &_input-container {
    width: 100%;
    position: relative;
    overflow: hidden;
    &_search-icon {
      width: 24px;
      height: 24px;
      display: block;
      color: var(--icon-secondary);
      position: absolute;
      left: 32px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      pointer-events: fill;
      @media screen and (max-width: 568px) {
        left: 24px;
      }
    }
    &_reset-icon {
      cursor: pointer;
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 52px;
      height: 24px;
      color: var(--icon-secondary);
      background: var(--background-content);
      pointer-events: fill;
      transition: color var(--transition-default);
      &:hover {
        color: var(--icon-secondary-hover);
      }
      @media screen and (max-width: 568px) {
        width: 44px;
      }
    }

    &_input {
      box-sizing: border-box;
      padding: 20px 72px;
      color: var(--text-primary);
      background: var(--background-content);
      border: 1px solid var(--border-default);
      border-radius: 40px;
      width: 100%;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      position: relative;
      appearance: none;
      outline: none;
      transition: all var(--transition-default);
      @media screen and (max-width: 568px) {
        padding: 16px 56px;
        font-size: 16px;
        line-height: 24px;
      }

      &:hover {
        box-shadow: var(--input-box-shadow-hover);
      }

      &:focus {
        border: 1px solid var(--accent-default);
      }
    }

    &_suffix-helper {
      visibility: hidden;
      display: inline-block;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1000;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      max-width: 100vw;
      overflow: hidden;
      @media screen and (max-width: 568px) {
        font-size: 16px;
        line-height: 24px;
      }
    }

    &_suffix {
      visibility: hidden;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tetriary);
      pointer-events: none;
      padding-left: 74px;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      @media screen and (max-width: 568px) {
        font-size: 16px;
        line-height: 24px;
        padding-left: 58px;
      }
    }
  }

  &_suggestions-container {
    z-index: 2;
    bottom: -16px;
    transform: translateY(100%);
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    background: var(--background-content);
    border: 0.5px solid var(--border-default);
    box-shadow: 0px 2px 24px var(--box-shadow-color-default);
    border-radius: 24px;
    padding: 16px 20px;
    @media screen and (max-width: 568px) {
      bottom: -12px;
      padding: 8px 18px;
    }

    &_item {
      width: auto;
      cursor: default;
      padding: 10px 12px;
      gap: 16px;
      font-size: 18px;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: stretch;
      border-radius: 10px;
      transition: background var(--transition-default);
      color: var(--text-primary);
      text-align: left;
      @media screen and (max-width: 568px) {
        padding: 8px 6px;
        gap: 8px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }

      &-text {
        text-overflow: ellipsis;
        flex: 1;
        overflow: hidden;
      }

      &-history-icon,
      &-reset-icon {
        color: var(--icon-secondary);
        width: 24px;
        height: 24px;
        display: block;
        pointer-events: fill;
      }
      &-reset-icon {
        transition: color var(--transition-default);
        &:hover {
          color: var(--icon-secondary-hover);
        }
      }

      &:not(:last-child) {
        margin-bottom: 6px;
      }

      &:hover {
        cursor: pointer;
        background: var(--background-content-hover);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
