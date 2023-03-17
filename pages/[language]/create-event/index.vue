<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field, Uploader } from "vant";
import { useCreatePosts, useSetAcl } from "~~/api/posts";
import { showLoading, hideLoading } from "~~/utils/loading";

const topicStore = useChooseTopicsStore();

const { t } = useTranslate();
useTitle(t("communityPosting"));
const language = useGetLanguage();
const title = ref("");
const content = ref("");
const canSubmit = computed(() => {
  return !!title.value && !!content.value;
});
const uploadImageStore = useUploadImageStore();
const { imageList: fileList } = storeToRefs(uploadImageStore);
const chooseTopicsStore = useChooseTopicsStore();
const router = useRouter();

const { setLocalStorage, getLocalStorage, clearLocalStorage } =
  useCreatePostsLocalStorage();

onMounted(() => {
  const local = getLocalStorage();
  content.value = local.content;
  title.value = local.title;
});
onBeforeUnmount(() => {
  setLocalStorage(title.value, content.value);
});
const onSave = async () => {
  if (!canSubmit.value) {
    return;
  }
  const topicLists = chooseTopicsStore.topicLists?.map((item) => {
    return {
      topicTagId: item.subVo.topicTagId,
      topicTagType: item.type,
    };
  });
  const params = {
    // columnManagementId: tabStore.tabActiveKey ?? "",
    content: content.value,
    name: title.value,
    postsUserPictureAddDtoList: fileList.value.map((item) => ({
      userPicture: (item as any).imageUrl ?? "",
    })),
    topicTagAddDtoList: topicLists,
  };
  showLoading();
  const res = await useCreatePosts(params);
  hideLoading();
  if (res.data.value?.code === 200) {
    router.back();
    clearInputPosts();
  }
};
const clearInputPosts = () => {
  clearLocalStorage();
  fileList.value = [];
  chooseTopicsStore.onClearTopics();
};

const handlePreUpload = async (file: any) => {
  const fileName = file?.file?.name;

  const res = await useApi().usePosts.usePreUpload({
    fileName,
  });
  if (res.data.value?.code !== 200) {
    return;
  }
  const { imageUrl, key, url } = res.data.value?.data ?? {};
  file.imageUrl = imageUrl;
  return { imageUrl, key, url };
};

const uploadImage = async (file: any, url: string) => {
  // const formData = new FormData();
  // formData.append("file", file.file);
  try {
    await useFetch(url ?? "", {
      method: "put",
      body: file.file,
    });
  } catch (error) {
    file.status = "failed";
  }
};

const handleAcl = async (file: any, key: string) => {
  // 设置权限
  const resAcl = await useSetAcl({ key: key ?? "" });
  if (resAcl.data.value?.code === 200) {
    file.status = "";
  } else {
    file.status = "failed";
  }
};

const afterRead = async (files: any) => {
  if (Array.isArray(files)) {
    for (const file of files) {
      handleUpload(file);
    }
    return;
  }
  handleUpload(files);
};

const handleUpload = async (file: any) => {
  file.status = "uploading";
  const { key, url } = (await handlePreUpload(file)) ?? {};
  await uploadImage(file, url ?? "");
  await handleAcl(file, key ?? "");
};

const onExpressionValue = (value: string) => {
  content.value += value;
};
const { onJump } = useJump();
</script>

<template>
  <div :class="$style.titleInput">
    <Field
      key="1"
      v-model="title"
      maxlength="30"
      :placeholder="t('createEventPlaceholder')"
    />
  </div>
  <div :class="$style.line"></div>
  <div :class="$style.create_wrap">
    <div :class="$style.area_wrap">
      <Field
        v-model="content"
        autosize
        :class="$style.textarea"
        type="textarea"
        maxlength="2000"
        :placeholder="t('createEventShare')"
        :border="false"
      />
      <div :class="$style.area_wrap_bottom">
        <!-- <NuxtLink
          :to="{ path: `/${language}/event-list`, query: { create: '1' } }"
        > -->
        <IconFont
          @click="onJump('/event-list', { create: '1' })"
          :class="$style.area_wrap_icon"
          type="topic-01"
        />
        <!-- </NuxtLink> -->
        <!-- <IconFont
          :class="$style.area_wrap_icon"
          type="expression-01"
          @click="showPopup"
        /> -->
        <ExpressionContent @on-click="onExpressionValue"></ExpressionContent>
      </div>
    </div>
    <div :class="$style.upload_wrap">
      <Uploader
        :max-count="9"
        v-model="fileList"
        multiple
        :after-read="afterRead"
      >
        <div :class="$style.upload_wrap_button">
          <IconFont :class="$style.create_post_icon" type="add-plus" />
        </div>
        <template v-slot:preview-delete>
          <div :class="$style.delIconBox">
            <!-- <IconFont type="close-02" :class="$style.delIcon" /> -->
            <IconFont :class="$style.del_Icon" type="close-04" />
          </div>
        </template>
      </Uploader>
    </div>

    <div :class="$style.event_wrap">
      <div
        v-for="(i, idx) of topicStore.topicLists"
        :class="$style.event_wrap_item"
      >
        {{ `#${i.subVo.name}` }}
        <IconFont
          :class="$style.del_Icon"
          @click="topicStore.delTopic(idx)"
          type="close-03"
        />
      </div>
    </div>
    <button
      :class="[
        $style.confirm,
        {
          [$style.confirmButActive]: canSubmit,
        },
      ]"
      @click="onSave"
    >
      {{ t("publish") }}
    </button>
  </div>
</template>

<style module lang="less">
.delIconBox {
  // width: 20px;
  // height: 20px;
  // background: rgba(0, 0, 0, 0.4);
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // border-radius: 50%;
  // color: var(--theme-neutral-n8-FFFFFF);
  transform: translate(-10px, 10px);
}
.delIcon {
  // width: 12px;
  // height: 12px;
  // color: var(--theme-neutral-n8-FFFFFF);
}
.line {
  height: 1px;
  margin: 0 16px;
  background: #ebedf0;
}
.titleInput {
  padding-top: 8px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.textarea {
  height: 343px;
}

.confirm {
  border: none;
  // position: fixed;

  // bottom: 48px;
  margin-top: 12px;
  font-weight: bold;
  line-height: 48px;
  text-align: center;
  color: var(--theme-main-753c06);
  font-size: 16px;
  width: 343px;
  height: 48px;
  background: var(--theme-main-gradient-dcb795);
  border-radius: 4px 4px 4px 4px;
  opacity: 0.5;
}
.confirmButActive {
  opacity: 1;
}
.del_Icon {
  position: absolute;
  width: 18px;
  height: 18px;
  right: -9px;
  top: -9px;
}
.event_wrap_item {
  position: relative;
  height: 18px;
  font-size: 13px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: var(--theme-neutral-n1-323233);
  line-height: 18px;
  padding: 3px 8px;
  background-color: var(--theme-neutral-n9-EDF3FF);
  border-radius: 4px;
}
.event_wrap {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.upload_wrap {
  margin-top: 16px;
  :global(.van-uploader__preview) {
    border-radius: 4px;
    overflow: hidden;
  }
}
.create_post_icon {
  width: 32px;
  height: 32px;
  color: var(--theme-main-753c06);
}
.upload_wrap_button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--theme-neutral-n8-F8F9FA);
  border-radius: 4px;
}
.area_wrap_bottom {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  gap: 13px;
  align-items: flex-end;
}
.area_wrap_icon {
  width: 24px;
  height: 24px;
}
.create_wrap {
  box-sizing: border-box;
  padding: 16px 16px 50px 16px;
}
.area_wrap {
  position: relative;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 1px 16px 18px 0px;
  background: var(--theme-neutral-n8-F8F9FA);
  padding-bottom: 40px;
  :global(.van-cell) {
    background: var(--theme-neutral-n8-F8F9FA);
  }
}
</style>
