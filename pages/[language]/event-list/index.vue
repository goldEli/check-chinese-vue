<script setup lang="ts">
import { Search as VanSearch, showToast } from "vant";
import { useGetTopicsList } from "~~/api/topics";
import Card from "./Card.vue";

const inputValue = ref("");
const searchName = ref("");
const params = computed(() => {
  return { name: searchName.value };
});
const { t } = useTranslate();
useTitle(t("listOfTopics"));
const { onJump } = useJump();
const res = await useGetTopicsList(params);
const route = useRoute();
const router = useRouter();
const store = useChooseTopicsStore();

const onChoose = (info: Model.Topics.Info) => {
  if (route.query.create === "1") {
    store.change(info);
    router.back();
  } else {
    onJump(`/information-topics/${info.id}`);
  }
};
const onSearch = () => {
  searchName.value = inputValue.value;
};

const onClear = () => {
  inputValue.value = "";
  onSearch();
};
</script>

<template>
  <van-search
    shape="round"
    v-model="inputValue"
    show-action
    :placeholder="t('eventListPlaceholder')"
    @search="onSearch"
    @clear="onClear"
  >
    <template #action>
      <div
        :class="[
          {
            [$style.searchBtn]: !inputValue,
            [$style.searchBtnActive]: !!inputValue,
          },
        ]"
        @click="onSearch"
      >
        {{ t("search") }}
      </div>
    </template>
    <template #left-icon>
      <div :class="$style.searchIconBox">
        <IconFont :class="$style.searchIcon" type="search" />
      </div>
    </template>
  </van-search>

  <SearchEmpty :search-name="searchName" :no-data="!res.list.value.length">
    <van-list
      :finished-text="t('noMore')"
      :finished="res.finished.value"
      @load="res.onNext"
      v-model:loading="res.res.pending.value"
    >
      <Card
        v-for="i of res.list.value"
        :data="i"
        :key="i.id"
        @click="onChoose(i)"
        :class="$style.list_wrap"
        :search-name="searchName"
      />
    </van-list>
  </SearchEmpty>
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
.searchIconBox {
  // width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchIcon {
  width: 20px;
  height: 20px;
  // color: var(--theme-neutral-n2-646566);
}
.searchBtn {
  padding: 0 8px;
  font-size: 14px;
  font-weight: 400;
  color: var(--theme-neutral-n4-bbbdbf);
}

.searchBtnActive {
  color: #323233;
}
</style>
