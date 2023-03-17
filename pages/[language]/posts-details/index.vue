<script setup lang="ts">
/**
 * 帖子详情页面
 */
import { showToast } from "vant";
import { useGetPostsInfo } from "~~/api/posts";

const { t } = useTranslate();
const { query } = useRoute();
useTitle(t("postsDetails"));

const params = computed(() => ({ postsId: query.id as string }));
const res = await useGetPostsInfo(params);
const data = computed(() => res.data.value?.data?.info);
const isGM = computed(() => data.value?.type !== 2);

const loading = ref(true);

const onRefresh = async () => {
  await res.refresh();
  loading.value = false;
};
</script>
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <LoadingPage :hide="!!data?.id">
      <div :class="$style.container">
        <PostsAreaOfficial v-if="isGM" :data="data" />
        <PostsAreaUser v-else :data="data" />
        <div :class="$style.gap"></div>
        <CommentArea :data="data" />
      </div>
    </LoadingPage>
  </van-pull-refresh>
</template>
<style module lang="less">
.gap {
  height: 8px;
  background: var(--theme-neutral-n8-F8F9FA);
}
.container {
  box-sizing: border-box;
  width: 100%;
  background: var(--theme-neutral-n8-FFFFFF);
  padding-bottom: 49px;
  // display: flex;
  // flex-direction: column;
  // gap: 8px;
}
</style>
