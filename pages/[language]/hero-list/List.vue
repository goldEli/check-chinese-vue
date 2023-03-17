<script setup lang="ts">
import { useGetHeroList } from "~~/api/hero";

const heroClassifyStore = useHeroClassifyStore();

const heroListRes = await useGetHeroList();

const list = computed(() => {
  const data = heroListRes.data.value?.data?.list.map((item) => {
    return {
      ...item,
      list: item.list
        .filter(
          (i) =>
            heroClassifyStore.heroTypeActiveList.length === 0 ||
            heroClassifyStore.heroTypeActiveList.includes(i.arms)
        )
        .filter(
          (i) =>
            heroClassifyStore.heroQualityActiveList.length === 0 ||
            heroClassifyStore.heroQualityActiveList.includes(i.quality)
        ),
    };
  });
  return data;
});
const { onJump } = useJump();
</script>

<template>
  <LoadingPage
    :hide="!heroListRes.pending.value"
    :show-no-data="list?.every((item) => !item.list.length)"
  >
    <div :class="$style.hero_list">
      <div :class="$style.hero_list_item" v-for="(item, idx) of list">
        <small-title :title="item.name" v-if="item.list.length" />
        <div :class="$style.image_area_more" v-if="item.list.length">
          <div
            v-for="i of item.list"
            @click="onJump(`/hero-detail/${i.id}`)"
            :class="$style.ground_glass_picture"
          >
            <ImageLoading :src="i.avatar" />
            <div :class="$style.ground_glass_picture_text">{{ i.name }}</div>
          </div>
        </div>
        <Gap v-if="list?.length !== idx + 1" />
      </div>
    </div>
  </LoadingPage>
</template>

<style module lang="less">
.ground_glass_picture {
  width: 112px;
  height: 112px;
  box-sizing: border-box;
  position: relative;
}
.ground_glass_picture_text {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  left: 0px;
  // height: 28px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 0px 0px 4px 4px;
  backdrop-filter: blur(3px);
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
}
.image_area_more {
  // margin-top: 8px;
  padding: 16px 16px 8px 16px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  img {
    width: 112px;
    height: 112px;
    background: #d9d9d9;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
  }
}
.hero_list_item {
  box-sizing: border-box;
  padding: 16px 0;
  background-color: var(--theme-neutral-n8-FFFFFF);
  position: relative;
  // &:after {
  //   content: "";
  //   height: 8px;
  //   background: #f8f9fa;
  //   display: block;
  //   width: 100vw;
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  // }
}
.hero_list {
}
</style>
