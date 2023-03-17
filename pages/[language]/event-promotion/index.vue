<script setup lang="ts">
import { useGetPostsCarouselList } from "~~/api/posts";
import CarouselItem from "./CarouselItem.vue";

const { t } = useTranslate();
useTitle(t("eventPromotion"));

const route = useRoute();
const params = computed(() => {
  return {
    columnManagementId: route.query?.id as string,
  };
});
const res = await useGetPostsCarouselList(params);
const list = computed(() => res.data.value?.data?.list);
const tabsStore = useTabsStore();

const columnsListParams = computed<API.Column.GetColumnList.Params>(() => {
  return {
    parentId: route.query.id,
  };
});
const columnListRes = useApi().useColumn.useColumnList(columnsListParams);
const tabList = computed(() => {
  return columnListRes.data.value?.data?.list;
});
</script>

<template>
  <LoadingPage :hide="!res.pending.value">
    <div :class="$style.wrap">
      <van-swipe
        :class="$style.swipe_example"
        :autoplay="3000"
        indicator-color="white"
      >
        <CarouselItem v-for="item in list" :data="item" :key="item.id" />
      </van-swipe>
    </div>
    <Gap v-if="!!list?.length" />

    <PostsListForChildColumn
      v-for="item in tabList"
      :key="item.id"
      :data="item"
    />
  </LoadingPage>
</template>

<style module lang="less">
.list {
  padding: 16px;
  box-sizing: border-box;
  background-color: var(--theme-neutral-n8-FFFFFF);
}
.swiper_wrap {
  width: 100%;
  background-color: white;
  margin-bottom: 8px;
  margin-top: 10px;
}
.swipe_example {
  // height: 160px;
}
.swiper_image {
  width: 343px;
  height: 160px;
  border-radius: 4px 4px 4px 4px;
}
.title {
  height: 22px;
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: var(--theme-neutral-n1-323233);
  }
}
.wrap {
  background-color: var(--theme-neutral-n8-FFFFFF);
  padding: 16px;
  margin-bottom: 8px;
}
.characters {
  margin: 12px 0 8px 0;
  display: flex;
  justify-content: space-between;
  & :nth-child(1) {
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: var(--theme-neutral-n1-323233);
    line-height: 22px;
  }
  & :nth-child(2) {
    height: 16px;
    line-height: 16px;
    border-radius: 20px;
    font-size: 10px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: var(--theme-neutral-n8-FFFFFF);
    padding: 2px 8px;
    background: var(--theme-main-sub-gradient-fe5d5d);
  }
}
.characters_time {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: var(--theme-neutral-n2-646566);
  line-height: 20px;
}
:global(.van-swipe__indicators) {
  top: 140px;
}
</style>
