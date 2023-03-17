<script setup lang="ts">
import { useGetConfig } from "~~/api/config";
import { useGetHeroInfo } from "~~/api/hero";

const { t } = useTranslate();
useTitle(t("detailsOfHeroes"));
const route = useRoute();

const params = computed<API.Hero.GetHeroInfo.Params>(() => {
  return {
    id: route.params.id as string,
  };
});

const res = await useGetHeroInfo(params);

const data = computed(() => res.data.value?.data?.info);

const roleInfo = computed<{ label: string; value?: string }[]>(() => {
  return [
    { label: t("name"), value: data.value?.name },
    {
      label: t("nickname"),
      value: data.value?.nickname,
    },
    // {
    //   label: "稀有度",
    //   value: "传说",
    // },
    {
      label: t("Arms"),
      value: data.value?.armsName,
    },
    {
      label: t("attributeGain"),
      value: data.value?.buffName,
    },
    {
      label: t("rolePositioning"),
      value: data.value?.positionName,
    },
  ];
});

const warInfo = computed(() => {
  return [
    { label: t("initialAnger"), value: data.value?.angerInit },
    {
      label: t("angerRecovery"),
      value: data.value?.angerRecoveryName,
    },
    {
      label: t("attackFrequency"),
      value: data.value?.attackFrequency,
    },
    {
      label: t("attackDistance"),
      value: data.value?.attackDistance,
    },
    {
      label: t("initialCombatPowerValue"),
      value: data.value?.combatPowerValue,
    },
  ];
});

const leadAbility = computed(() => {
  return (
    data.value?.heroTroopSkillList.map((item) => {
      return {
        label: item.name,
        value: item.number,
      };
    }) ?? []
  );
});
</script>

<template>
  <div>
    <ImageLoading :class="$style.cover" :src="data?.poster" />
  </div>
  <div :class="$style.wrap">
    <HeroTitleAndInfo :title="t('roleInformation')" :data="roleInfo" />
    <HeroTitleAndInfo :title="t('operationalInformation')" :data="warInfo" />
    <HeroTitleAndInfo :title="t('leadingAbility')" :data="leadAbility" />

    <HeroChooseSkill :data="data?.heroSkillList ?? []" />
  </div>
</template>

<style module lang="less">
.cover {
  width: 375px;
  height: 204px;
}
.wrap {
  box-sizing: border-box;
  padding: 16px 16px 0 16px;
}
</style>
