<script setup lang="ts">
import { useGetMessageCenterList } from "~~/api/mine";

/**
 * 帖子详情页面
 */
// import { showToast } from "vant";

// const route = useRoute();
// const loading = ref(true);
const { t } = useTranslate();
useTitle(t("myThumbsUp"));





</script>
<template>
  <MyLikesList />
</template>
<style module lang="less">
.container {
  box-sizing: border-box;
  width: 100%;
  background: var(--theme-neutral-n8-FFFFFF);
  padding-bottom: 49px;
}
</style>
