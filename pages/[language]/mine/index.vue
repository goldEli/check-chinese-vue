<script setup lang="ts">
import PersonalInfo from "./PersonalInfo/index.vue";
import StatArea from "./StatArea/index.vue";
import MenuArea from "./MenuArea/index.vue";
const {t} = useTranslate()
useTitle(t('my'));
</script>

<template>
  <div :class="$style.container">
    <PersonalInfo />
    <StatArea />
    <MenuArea />
  </div>
</template>

<style module lang="less">
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 17px 24px;
  background: var(--theme-neutral-n8-FFFFFF);
}
</style>
