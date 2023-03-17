<script setup lang="ts">
</script>

<template>
  <van-dropdown-item>
    <template #title>
      <slot name="title" />
    </template>
    <slot />
  </van-dropdown-item>
</template>

<style module lang="less">
:global(.van-dropdown-menu__bar) {
  padding: 0 16px;
}
:global(.van-dropdown-menu__bar) {
  justify-content: space-between;
}
:global(.van-dropdown-menu__title) {
  padding-left: 0;
  padding-right: 24px;
}
:global(.van-dropdown-menu__item) {
  flex: unset;
  // width: 80px;
  justify-content: space-between;
}
:global(.van-ellipsis) {
  // width: 56px;
  font-size: 14px;
  font-weight: 500;
  color: #323233;
}
:global(.van-dropdown-menu__title:after) {
  // position: absolute;
  // top: 50%;
  // right: -1.066667vw;
  // margin-top: -1.333333vw;
  // border: 0.8vw solid;
  // border-color: transparent transparent var(--van-gray-4) var(--van-gray-4);
  // transform: rotate(-45deg);
  // content: "";
  opacity: 0;
}
:global(.van-dropdown-menu__title) {
  padding-right: 0;
}
:global(.van-haptics-feedback:active) {
  opacity: 1;
}
</style>
