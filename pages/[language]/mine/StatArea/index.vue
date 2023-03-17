<script setup lang="ts">
import { useGetUserLikesAndCreateStatistics } from "~~/api/mine";
const { t } = useTranslate();

const res = await useGetUserLikesAndCreateStatistics();
const data = computed(() => res.data.value?.data?.info);
const statData = computed(() => [
  {
    label: t('numberOfPosts'),
    number: formatNumber(data.value?.postsNums),
    icon: "posts",
  },
  {
    label: t('numberOfLikes'),
    number: formatNumber(data.value?.likeNums),
    icon: "like-02",
  },
]);
</script>

<template>
  <div :class="$style.statArea">
    <div :class="$style.statCard" v-for="item in statData">
      <div :class="$style.statCardLeft">
        <span :class="$style.statLabel">{{ item.label }}</span>
        <span :class="$style.statNumber">{{ item.number }}</span>
      </div>
      <div :class="$style.statCardRight">
        <IconFont :class="$style.statIcon" :type="item.icon" />
      </div>
    </div>
  </div>
</template>

<style module lang="less">
.statArea {
  width: 100%;
  box-sizing: border-box;
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
  .statCard {
    width: 156px;
    height: 64px;
    border-radius: 8px;
    padding: 6px 12px 6px 16px;
    box-sizing: border-box;
    background: var(--theme-neutral-n7-f5f6f7);
    display: flex;
    gap: 58px;
  }
  .statCardLeft {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .statCardRight {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    opacity: 0.4;
  }
  .statIcon {
    width: 28px;
    height: 28px;
    color: var(--theme-neutral-n2-646566);
  }
  .statLabel {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: var(--theme-neutral-n3-969799);
  }
  .statNumber {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: var(--theme-neutral-n1-323233);
  }
}
</style>
