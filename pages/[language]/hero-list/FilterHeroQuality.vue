<script setup lang="ts">
import { storeToRefs } from "pinia";
import VanDropdownItem from "./VanDropdownItem.vue";
import FilterTitleBox from "./FilterTitleBox.vue";
import FilterList from "./FilterList.vue";
const active = ref(false);

const heroClassifyStore = useHeroClassifyStore();
const { titleHeroQuality, heroQualityList, heroQualityActiveList } =
  storeToRefs(heroClassifyStore);

const onChange = (code: number) => {
  heroClassifyStore.onChange(code, "quality");
};
</script>

<template>
  <VanDropdownItem
    :class="$style.align_right"
    @open="active = true"
    @close="active = false"
  >
    <template #title>
      <FilterTitleBox :title="titleHeroQuality ?? ''" :active="active">
        <IconFont
          :type="active ? 'gradient-filter' : 'screening'"
          :class="$style.icon"
        />
      </FilterTitleBox>
    </template>
    <FilterList
      :active-list="heroQualityActiveList"
      :list="heroQualityList ?? []"
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
