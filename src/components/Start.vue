<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
</script>

<template>
  <main>
    <h1>{{ $t('start.title') }}</h1>
    <p>
      {{$t('start.description')}}
      <a href="https://blog.ton.org/ton-sites" target="_blank">{{$t('start.moreLink')}}</a>
    </p>
    <div class="search">
      <SearchInput />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 16px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 120px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    margin-top: 0;
    margin-bottom: 16px;
    color: var(--text-primary);
    @media screen and (max-width: 568px) {
      font-size: 26px;
      line-height: 32px;
      margin-bottom: 8px;
    }
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-secondary);
    max-width: 590px;
    margin-top: 0;
    margin-bottom: 8px;
    @media screen and (max-width: 568px) {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      max-width: 520px;
    }

    a {
      font-weight: 600;
      display: inline-block;
    }
  }

  .search {
    max-width: 928px;
    width: 100%;
    margin-top: 40px;
    position: relative;
    @media screen and (max-width: 568px) {
      margin-top: 24px;
    }
  }
}
</style>
