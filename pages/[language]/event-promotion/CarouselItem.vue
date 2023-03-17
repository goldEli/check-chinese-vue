<script setup lang="ts">
// import dayjs from 'dayjs';
interface Props {
  data: API.Posts.GetPostsCarouselList.Result["list"][0];
}
const props = withDefaults(defineProps<Props>(), {});
const { goToPostsDetails } = useGoToPostsDetails();
const { t } = useTranslate();

const formatDate = (str: string) => {
  return str.split(" ")[0]?.replace(/-/g, '/');
};
const timeRange = computed(() => {
  return `${formatDate(props.data.activityStartTime)} — ${formatDate(
    props.data.activityEndTime
  )}`;
});
const active = computed(() => {
  const endTime = new Date(props.data.activityEndTime).getTime();
  const today = new Date().getTime();
  return endTime - today > 0;
});

const text = computed(() => {
  return active.value ? t("inProgress") : t("completed");
});
</script>

<template>
  <van-swipe-item>
    <ImageLoading
      @click="goToPostsDetails(data.postsId)"
      :class="$style.swiper_image"
      :src="data.carouselPicture"
    />
    <div :class="$style.characters">
      <span :class="$style.postsName">{{ data.postsName }}</span>
      <span :class="[$style.label, { [$style.labelActive]: active }]">{{
        text
      }}</span>
    </div>
    <div :class="$style.characters_time">
      {{ t("activityTime") }}：{{ timeRange }}
    </div>
  </van-swipe-item>
</template>

<style module lang="less">
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
  gap: 8px;
  .postsName {
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: var(--theme-neutral-n1-323233);
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .label {
    flex-shrink: 0;
    height: 16px;
    line-height: 16px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 8px;
    background: var(--theme-neutral-n6-ebedf0);
    color: var(--theme-neutral-n2-646566);
  }
  .labelActive {
    color: var(--theme-neutral-n8-FFFFFF);
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
</style>
