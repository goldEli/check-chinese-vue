<script setup lang="ts">
import { storeToRefs } from "pinia";
import VanDropdownItem from "./VanDropdownItem.vue";
import FilterTitleBox from "./FilterTitleBox.vue";
import FilterList from "./FilterList.vue";
const active = ref(false);

const heroClassifyStore = useHeroClassifyStore();
const { titleHeroType, heroTypeList, heroTypeActiveList } =
  storeToRefs(heroClassifyStore);

const onChange = (code: number) => {
  heroClassifyStore.onChange(code, "type");
};
</script>

<template>
  <VanDropdownItem
    @open="active = true"
    @close="active = false"
    :class="$style.align_left"
  >
    <template #title>
      <FilterTitleBox :title="titleHeroType ?? ''" :active="active">
        <IconFont
          :type="active ? 'gradient-up' : 'down'"
          :class="$style.icon"
        />
      </FilterTitleBox>
    </template>
    <FilterList
      :active-list="heroTypeActiveList"
      :list="heroTypeList ?? []"
      @on-change="onChange"
    />
  </VanDropdownItem>
</template>

<style module lang="less">
.icon {
  width: 17px;
  height: 17px;
}
</style>
