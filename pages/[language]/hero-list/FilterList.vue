<script setup lang="ts">
interface Props {
  list: API.Config.ListItem[];
  activeList: API.Config.ListItem["code"][];
}
const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits<{
  (e: "onChange", code: number): void;
}>();
</script>

<template>
  <div :class="$style.class_container">
    <span
      @click="emits('onChange', i.code)"
      v-for="i of list"
      :class="[
        $style.class_container_item,
        {
          [$style.class_container_item_active]: activeList.includes(i.code),
        },
      ]"
    >
      {{ i.msg }}
    </span>
  </div>
</template>

<style module lang="less">
.class_container {
  justify-content: flex-start;
  flex-wrap: wrap;
  display: flex;
  gap: 16px;
  box-sizing: border-box;
  padding: 16px;
  font-size: 14px;
}
.class_container_item {
  color: var(--theme-neutral-n1-323233);
  border-radius: 4px;
  padding: 6px 16px;
  background: var(--theme-neutral-n7-f5f6f7);
}
.class_container_item_active {
  color: #753c06;
  background: var(--theme-main-gradient-dcb795);
}
</style>
