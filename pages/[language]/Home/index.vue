<script setup lang="ts">
const { t } = useTranslate();
useTitle(t("homepage"));
const tabsStore = useTabsStore();

// 展示轮播
const showSwiper = computed(() => {
  return tabsStore.tabActiveInfo?.style === 0;
});
const showContent = computed(() => {
  return !!tabsStore.tabActiveKey;
});
</script>

<template>
  <Tabs />
  <HomePostsWithSwiper v-if="showSwiper && showContent" />
  <HomeStrategy v-if="!showSwiper && showContent" />
</template>

<style module></style>