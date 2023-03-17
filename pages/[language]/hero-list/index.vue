<script setup lang="ts">
import Filter from "./Filter.vue";
import List from "./List.vue";

const { t } = useTranslate();
useTitle(t("listOfHeroes"));
</script>

<template>
  <Filter />
  <List />
</template>

<style module lang="less">
</style>
