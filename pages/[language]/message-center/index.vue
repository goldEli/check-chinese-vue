<script setup lang="ts">
import { useGetUnreadNumber } from "~~/api/mine";
import useJump from "~~/composables/useJump";
const { t } = useTranslate();
useTitle(t("messageCenter"));
const res = await useGetUnreadNumber();
const data = computed(() => res.data.value?.data?.info);
const lists = [
  {
    color: "#fff4f2",
    iconColor: "#E28071",
    type: "like",
    tag: data.value?.likeNums,
    text: t("giveLike"),
    link: "/my-likes",
  },
  {
    color: "#F2F4FF",
    iconColor: "#667eff",
    type: "m-center",
    tag: data.value?.commentNums,
    text: t("comment"),
    link: "/my-comments",
  },
  {
    color: "#F6F2FF",
    iconColor: "#8E66FF",
    type: "reply",
    tag: data.value?.toMeNums,
    text: t("reply"),
    link: "/reply-to-my-comments",
  },
];
const { onJump } = useJump();
</script>

<template>
  <div :class="$style.big_wrap">
    <div :class="$style.wrap">
      <van-tabbar :fixed="false" :border="false">
        <van-tabbar-item v-for="item of lists" @click="onJump(item.link)">
          <span>{{ item.text }}</span>
          <template #icon>
            <ColorHead
              :color="item.color"
              :iconColor="item.iconColor"
              :type="item.type"
              :tag="item.tag ?? 0"
            />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div :class="$style.system" @click="onJump('/system-notification')">
      <div :class="$style.system_item">
        <ColorHead
          color="#F2F2F2"
          iconColor="#646566"
          type="message"
          :tag="data?.systemNums ?? 0"
        />
        <div :class="$style.system_item_wrap">
          <div :class="$style.system_item_top">
            <span>{{ t("systemNotification") }}</span>
            <span>{{ data?.systemMsgTime }}</span>
          </div>
          <!-- <div :class="$style.system_item_bottom">
            {{ data?.systemMsgTitle }}
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="less">
.big_wrap {
  background: var(--theme-neutral-n8-F8F9FA);
}
.system_item_wrap {
  // justify-content: space-between;
  display: flex;
  // flex-direction: column;
  align-items: center;
  width: 278px;
}
.system_item_bottom {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: var(--theme-neutral-n1-323233);
  line-height: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.system_item_top {
  margin-bottom: 8px;
  display: flex;
  // justify-content: space-between;
  // justify-content: center;
  // align-items: flex-end;
  :nth-child(1) {
    // height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: var(--theme-neutral-n1-323233);
    line-height: 22px;
  }
  :nth-child(2) {
    // height: 16px;
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: var(--theme-neutral-n3-969799);
    line-height: 16px;
  }
}
.system_item {
  display: flex;
  gap: 12px;
}
.system {
  background-color: var(--theme-neutral-n8-FFFFFF);
  margin-top: 8px;
  box-sizing: border-box;
  padding: 16px;
}
.wrap {
  background-color: var(--theme-neutral-n8-FFFFFF);
  box-sizing: border-box;
  padding: 32px 0 32px 0;
  :global(.van-tabbar-item__text) {
    color: var(--theme-neutral-n1-323233);
  }
}
</style>
