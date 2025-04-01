<script setup lang="ts">
import { useConfig } from '@/utils/useConfig.ts'

const config = useConfig();
const DOMAIN_PROXY_URL = config.get('VITE_DOMAIN_PROXY_URL')

</script>

<template>
  <footer>
    <div class="separator"></div>
    <div class="copyrights">
      <div class="info-links">
        <div class="info-links__no-link">
          <span>Developed by</span> <a :href="`https://duelist.${DOMAIN_PROXY_URL}`" rel="noreferrer noopener">Duelist</a>
        </div>
      </div>
      <div class="social-links">
        <a aria-label="Telegram" class="social-links__link" href="https://t.me/duelist" target="_blank" rel="noreferrer noopener">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.636 2.636A8.972 8.972 0 0 1 9 0a8.972 8.972 0 0 1 6.364 2.636A8.972 8.972 0 0 1 18 9a8.972 8.972 0 0 1-2.636 6.364A8.972 8.972 0 0 1 9 18a8.972 8.972 0 0 1-6.364-2.636A8.972 8.972 0 0 1 0 9a8.972 8.972 0 0 1 2.636-6.364Zm6.421 3.645c-.895.38-2.685 1.168-5.37 2.362-.435.177-.664.35-.685.52-.035.285.316.398.794.551l.201.066c.47.156 1.103.338 1.432.346.298.006.63-.12.998-.377 2.508-1.729 3.803-2.602 3.885-2.621.057-.014.136-.03.19.019.054.049.049.141.043.166-.035.151-1.412 1.459-2.125 2.135-.222.211-.38.361-.412.395-.072.077-.146.15-.217.219-.437.43-.764.752.018 1.279.376.253.677.462.977.67.328.228.655.456 1.078.739.108.072.211.147.311.22.382.278.725.527 1.148.487.246-.023.5-.259.63-.964.304-1.665.904-5.272 1.043-6.759a1.7 1.7 0 0 0-.016-.37.4.4 0 0 0-.13-.255.597.597 0 0 0-.358-.109c-.346.006-.877.195-3.435 1.281Z" fill="currentColor"></path>
          </svg>
        </a>
        <a aria-label="Github" class="social-links__link" href="https://github.com/duelist-dev/ton-proxy-frontend" target="_blank" rel="noreferrer noopener">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.298 17.704A9 9 0 1 0 0 9a9.003 9.003 0 0 0 6.97 8.77.428.428 0 0 0 .115-.302l-.004-.472-.008-.952c-2.329.506-2.82-1.123-2.82-1.123-.38-.968-.93-1.226-.93-1.226-.76-.52.058-.51.058-.51.84.06 1.282.864 1.282.864.747 1.28 1.96.911 2.437.696.076-.541.293-.91.532-1.12-1.86-.211-3.814-.93-3.814-4.14 0-.915.326-1.663.862-2.249-.086-.212-.374-1.063.082-2.217 0 0 .703-.225 2.302.86a8.035 8.035 0 0 1 2.096-.283 8.038 8.038 0 0 1 2.096.282c1.598-1.084 2.3-.859 2.3-.859.457 1.154.17 2.005.083 2.217.537.586.861 1.334.861 2.249 0 3.218-1.957 3.927-3.822 4.134.3.259.568.77.568 1.551 0 .75-.005 1.401-.008 1.833l-.003.466c0 .08.02.163.063.235Z" fill="currentColor"></path>
          </svg>
        </a>
        <a aria-label="Mail" class="social-links__link" href="mailto:duelist.dev@gmail.com" target="_blank" rel="noreferrer noopener">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0a8.972 8.972 0 0 0-6.364 2.636A8.972 8.972 0 0 0 0 9a8.972 8.972 0 0 0 2.636 6.364A8.972 8.972 0 0 0 9 18a8.972 8.972 0 0 0 6.364-2.636A8.972 8.972 0 0 0 18 9a8.972 8.972 0 0 0-2.636-6.364A8.972 8.972 0 0 0 9 0Zm0 8.435 4.73-2.775A1.5 1.5 0 0 0 12.5 5h-7a1.5 1.5 0 0 0-1.24.655L9 8.435Zm0 .995a1 1 0 0 0 .5-.135l4.5-2.63V11.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 4 11.5V6.665L8.5 9.3a1 1 0 0 0 .5.13Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-tetriary);
}
.separator {
  width: 100%;
  height: 1px;
  background-color: var(--separator-footer);
}
.copyrights {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-links {
  display: flex;
  gap: 24px;
  &__no-link {
    display: flex;
    gap: 4px;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    &-icon {
      width: 16px;
      height: 16px;
    }
    @media screen and (max-width: 1024px) {
      font-size: 12px;
      line-height: 20px;
      &-icon {
        width: 14px;
        height: 14px;
      }
    }
  }
  &__link {
    color: unset;
    display: flex;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    &-icon {
      width: 16px;
      height: 16px;
    }
    @media screen and (max-width: 1024px) {
        font-size: 12px;
        line-height: 20px;
      &-icon {
        width: 14px;
        height: 14px;
      }
    }
    &:hover {
      color: var(--accent-default);
    }
  }
}
.social-links {
  display: flex;
  gap: 10px;
  &__link {
    color: var(--text-tetriary);
    height: 18px;
    transition: color var(--transition-default);
    &:hover {
      color: var(--accent-default)
    }
  }
}
</style>
