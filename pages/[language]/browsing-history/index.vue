<script setup lang="ts">
const { t } = useTranslate();
useTitle(t("browsingHistory"));


</script>

<template>
  <div :class="$style.wrap">
    <MyViewList />
    <!-- <CardForSimple />
    <CardForSimple />
    <CardForSimple />
    <CardForSimple /> -->
  </div>
</template>

<style module lang="less">
.wrap {
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
</style>
