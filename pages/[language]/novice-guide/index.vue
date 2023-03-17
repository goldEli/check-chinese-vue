<script setup lang="ts">
const { t } = useTranslate();
const route = useRoute();
const columnsListParams = computed<API.Column.GetColumnList.Params>(() => {
  return {
    parentId: route.query.id,
  };
});
watchEffect(() => {
  useTitle((route.query.name as string) ?? t("noviceGuide"));
});

const columnListRes = useApi().useColumn.useColumnList(columnsListParams);
const tabList = computed(() => {
  return columnListRes.data.value?.data?.list;
});
</script>

<template>
  <div v-for="(item, idx) in tabList" :key="item.id">
    <PostsListForChildColumn :data="item" :custom-title="true">
      <template v-slot:title>
        <SmallTitle :title="item.name" />
      </template>
    </PostsListForChildColumn>
    <Gap v-if="idx + 1 !== tabList?.length" />
  </div>
</template>

<style module lang="less">
.wrap {
  box-sizing: border-box;
  padding: 16px;
  background-color: white;
  margin-bottom: 8px;
}
</style>
