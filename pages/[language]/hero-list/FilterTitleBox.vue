<script setup lang="ts">
interface Props {
  title: string;
  active: boolean;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div :class="[$style.titleBox]">
    <span
      :class="[
        $style.titleBox_text,
        {
          [$style.active]: active,
        },
      ]"
      >{{ title }}</span
    >
    <slot />
  </div>
</template>

<style module lang="less">
.titleBox {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 24px;
  .titleBox_text {
    line-height: 14px;
  }
}
.active {
  background: var(--theme-main-gradient-dcb795);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
