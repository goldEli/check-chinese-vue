<script setup lang="ts">
import FilterHeroType from "./FilterHeroType.vue";
import FilterHeroQuality from "./FilterHeroQuality.vue";
</script>

<template>
  <van-dropdown-menu>
    <FilterHeroType />
    <FilterHeroQuality />
  </van-dropdown-menu>
</template>

<style module lang="less">
:global(.van-dropdown-menu__bar) {
  box-shadow: none;
}
</style>
