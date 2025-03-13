<script setup lang="ts"></script>

<template>
  <div class="badge">
    <a href="/" aria-label="TON Proxy">
      <div class="badge__icon"></div>
    </a>
    <span class="badge__text">PROXY <sup class="badge__text-beta">β</sup></span>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  display: flex;
  height: 48px;
  font-size: 22px;
  line-height: 22px;
  align-items: center;
  gap: 8px;
  &__icon {
    cursor: pointer;
    width: 32px;
    height: 32px;
    background-image: url(../assets/icons/ton.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: filter var(--transition-default);
    &:hover {
      filter: brightness(1.1);
    }
  }

  &__text {
    font-weight: 600;
    color: var(--text-primary);

    &-beta {
      font-weight: 500;
      color: var(--text-tetriary);
    }
  }
}
</style>
