<script setup lang="ts">
const { t } = useTranslate();
useTitle(t("systemNotification"));
</script>
<template>
  <SystemNotificationList />
</template>
<style module lang="less">
.container {
  box-sizing: border-box;
  width: 100%;
  background: var(--theme-neutral-n8-F8F9FA);
  padding-bottom: 49px;
}
</style>
