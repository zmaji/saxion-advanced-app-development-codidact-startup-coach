<!--suppress TypeScriptUnresolvedReference -->
<script setup lang="ts">
  import type { Content } from '@/typings/Content';
  import type { Label } from '@/typings/Label';

  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import {
    CategoryBreadCrumb,
    CategorySidebar,
    DateLabel,
    PageTitle,
    SecondaryTitle,
    TextLabel,
    IconLabel
  } from '@/components';
  import httpService from '@/plugins/http/httpService';

  const route = useRoute();
  const loaded = ref(false);
  const content = ref<Content>();

  const fetchContent = async () => {
    try {
      const response = await httpService.getRequest<Content>(`/content/${route.params.contentID}`, false);

      if (response && response.data) {
        content.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loaded.value = true;
    }
  }

  onMounted(() => {
    fetchContent();
  });
</script>

<template>
  <div v-if="!loaded">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="loaded && content">
    <PageTitle>{{ content.title }}</PageTitle>

    <div class="d-flex flex-row flex-wrap align-items-center pb-3">
      <CategoryBreadCrumb/>
    </div>

    <div class="d-flex flex-row flex-wrap justify-content-start pb-2">
      <div class="d-flex align-items-center pe-4">
        <IconLabel
          icon="user"
          type="primary"
          display-style="secondary"
        />

        <span class="text-secondary">{{ content.user.fullName }}</span>
      </div>

      <DateLabel :date="content.createdAt" class="pe-4"/>

      <div class="d-flex align-items-center">
        <IconLabel
          icon="thumbs-up"
          type="success"
          display-style="secondary"
        />

        <span class="text-secondary">867</span>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap pb-4">
      <IconLabel
        v-if="content.labels.find((label: Label) => label.name === 'Standaard sjabloon')"
        icon="file"
        type="success"
        display-style="secondary"
        size="lg"
        class="mt-2"
      >
        Standaard sjabloon
      </IconLabel>

      <template v-for="(label, key) in content.labels">
        <TextLabel
          v-if="label.name !== 'Standaard sjabloon'"
          :key="key"
          type="white"
          class="mt-2"
        >
          {{ label.name}}
        </TextLabel>
      </template>
    </div>

    <p class="mb-0 pb-3">{{ content.description }}</p>

    <SecondaryTitle>Bijlage</SecondaryTitle>

    <div class="bg-white px-4 py-3 border rounded d-flex flex-row justify-content-start align-items-center w-fit">
      <IconLabel
        icon="file"
        type="primary"
        display-style="secondary"
        class="me-3"
      />

      {{ content?.attachment }}
    </div>

    <CategorySidebar/>
  </div>
</template>

<style scoped>
  .w-fit {
    width: fit-content;
  }
</style>