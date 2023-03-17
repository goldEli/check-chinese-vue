<script setup lang="ts">

const { t } = useTranslate();
useTitle(t("myComments"));
</script>
<template>
  <my-comment-list />
</template>
<style module lang="less">
.container {
  box-sizing: border-box;
  width: 100%;
  background: var(--theme-neutral-n8-F8F9FA);
  padding-bottom: 49px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
