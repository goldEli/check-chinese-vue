<script setup lang="ts">
import { Badge } from "vant";
import { useGetUnreadNumber } from "~~/api/mine";
const { t } = useTranslate();

const language = useGetLanguage();
const res = await useGetUnreadNumber();
const data = computed(() => res.data.value?.data?.info);
const total = computed(() => {
  const {
    commentNums = 0,
    likeNums = 0,
    systemNums = 0,
    toMeNums = 0,
  } = data.value ?? {};
  return commentNums + likeNums + systemNums + toMeNums;
});
// 菜单列表
const menuData = [
  {
    label: t("messageCenter"),
    icon: "m-center",
    path: "message-center",
    total: total.value,
  },
  {
    label: t("myPosting"),
    icon: "my-posting",
    path: "my-posts",
    total: 0,
  },
  {
    label: t("browsingHistory"),
    icon: "browsing-history",
    path: "browsing-history",
    total: 0,
  },
];
const { onJump } = useJump();
</script>

<template>
  <div :class="$style.menuArea">
    <div
      @click="onJump(`/${item.path}`)"
      :class="$style.menuAreaItem"
      v-for="item in menuData"
    >
      <Badge :offset="[-5, 5]" :show-zero="false" :content="item.total">
        <div :class="$style.menuIconBg">
          <IconFont :class="$style.menuIcon" :type="item.icon" />
        </div>
      </Badge>
      <div :class="$style.menuLabel">{{ item.label }}</div>
    </div>
  </div>
</template>

<style module lang="less">
.menuArea {
  border-radius: 8px 8px 8px 8px;
  height: 108px;
  width: 100%;
  background: var(--theme-neutral-n8-FFFFFF);
  box-sizing: border-box;
  box-shadow: 0px 2px 12px 0px rgba(9, 87, 222, 0.1);
  margin-top: 24px;
  opacity: 1;
  padding: 16px 20px;
  display: flex;
  // gap: 59px;
  justify-content: space-between;
  .menuAreaItem {
    width: 56px;
    height: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .menuIconBg {
    width: 48px;
    height: 48px;
    background: var(--theme-main-gradient-dcb795);
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menuIcon {
    width: 20px;
    height: 20px;
    color: var(--theme-main-753c06);
  }
  .menuLabel {
    font-size: 14px;
    font-weight: 400;
    color: var(--theme-neutral-n1-323233);
    line-height: 20px;
  }
}
</style>
