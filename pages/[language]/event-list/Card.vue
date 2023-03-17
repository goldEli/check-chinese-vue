<script setup lang="ts">
interface Props {
  data: Model.Topics.Info;
  searchName: string;
}
const props = withDefaults(defineProps<Props>(), {});
const { t } = useTranslate();
const title = computed(() => {
  const str = props.data?.subVo.name.replace(
    props.searchName,
    `<span style="color: #feaa5d">${props.searchName}</span>`
  );
  return str;
});
</script>

<template>
  <div :class="$style.list_wrap">
    <ImageLoading :class="$style.event_img" :src="data.picture" />

    <div :class="$style.list_wrap_right">
      <div v-html="title" :class="$style.list_wrap_right_desc"></div>
      <div>
        <IconFont :class="$style.swiper_right_top_icon" type="fire" />
        <span :class="$style.list_wrap_right_title">{{
          `${t("heat")}${formatNumber(data.heatValue)}`
        }}</span>
      </div>
    </div>
  </div>
</template>

<style module lang="less">
.search {
  font-size: 14px;
  color: var(--theme-neutral-n4-bbbdbf);
}
.list_wrap_right_title {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: var(--theme-neutral-n3-969799);
}
.list_wrap_right_desc {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  display: -webkit-box; //特别显示模式
  -webkit-line-clamp: 2; //行数
  line-clamp: 2;
  -webkit-box-orient: vertical; //盒子中内容竖直排列
  font-size: 16px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: var(--theme-neutral-n1-323233);
  line-height: 22px;
}
.list_wrap_right {
  width: 231px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.swiper_right_top_icon {
  margin-right: 4px;
  width: 16px;
  height: 16px;
}
.list_wrap {
  display: flex;
  gap: 8px;
  padding: 16px;
  box-sizing: border-box;
}
.event_img {
  width: 104px;
  height: 84px;
}
</style>
