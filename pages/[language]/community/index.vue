<script setup lang="ts">
const { t } = useTranslate();
useTitle(t("theGamingCommunity"));
const { jumpToCreateTopicPage } = useChooseTopicsStore();
</script>

<template>
  <CommunityTabs />
  <CommunityContent />
  <div @click="jumpToCreateTopicPage" :class="$style.create_post">
    <IconFont :class="$style.create_post_icon" type="add-plus" />
    <!-- <img src="@/assets/btn.svg" /> -->
  </div>
</template>

<style module lang="less">
.create_post_icon {
  width: 24px;
  height: 24px;
  color: var(--theme-main-753c06);
  opacity: 1;
}
.create_post {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: fixed;
  right: 16px;
  bottom: 100px;
  width: 56px;
  height: 56px;
  background: var(--theme-main-gradient-dcb795);
  box-shadow: 0px -4px 8px 0px rgba(117, 60, 6, 0.1),
    0px 4px 8px 0px rgba(117, 60, 6, 0.1);
  border-radius: 48px 48px 48px 48px;
  opacity: 1;
}
</style>
