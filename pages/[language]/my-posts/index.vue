<script setup lang="ts">
const { t } = useTranslate();
useTitle(t('myPosting'));
</script>

<template>
  <div :class="$style.container">
    <MyPostsList />
  </div>
</template>

<style module lang="less">
.container {
}
</style>
