<script setup>

const res = await useUserInfo();
const data = computed(() => res.userInfo.value.info);
</script>
<template>
  <div :class="$style.personalInfoArea">
    <ImageLoading
      width="50"
      height="50"
      round
      radius="50%"
      fit="cover"
      :src="data.avatar"
    />
    <div :class="$style.personalInfo">
      <div :class="$style.title">{{ data.name }}</div>
      <div :class="$style.des">{{ data.sign }}</div>
    </div>
  </div>
</template>

<style module lang="less">
.personalInfoArea {
  width: 100%;
  height: 50px;
  display: flex;
  gap: 12px;
}
.personalInfo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.title {
  color: var(--theme-neutral-n1-323233);
  font-weight: 500;
  font-size: 16px;
}
.des {
  font-size: 14px;
  font-weight: 400;
  color: var(--theme-neutral-n3-969799);
}
</style>
