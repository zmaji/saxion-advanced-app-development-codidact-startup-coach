<script setup lang="ts">

  import type { Category } from '@/typings/Category';
  import type { Content } from '@/typings/Content';
  import type { Ref } from 'vue';
  import type { Label } from '@/typings/Label';

  import { onMounted, ref } from 'vue';

  import {
    CategoryBreadCrumb,
    ContentCategoryNavItem,
    PageTitle,
    SecondaryTitle,
    SearchBar
  } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import ContentItem from '@/components/content/ContentItem.vue';

  const categories: Ref<Category[]> = ref<Category[]>([]);
  const contents: Ref<Content[]> = ref<Content[]>([]);
  const standardContents: Ref<Content[]> = ref<Content[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await httpService.getRequest<Category[]>('/categories', false);

      if (response && response.data) {
        categories.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const fetchContent = async () => {
    try {
      const response = await httpService.getRequest<Content[]>('/content', false);

      if (response && response.data) {
        contents.value = response.data.filter(
          (content) => !content.labels.find((label: Label) => label.name === 'Standaard sjabloon')
        );

        standardContents.value = response.data.filter(
          (content) => content.labels.find((label: Label) => label.name === 'Standaard sjabloon'));
      }
    } catch (e) {
      console.error(e);
    }
  }

  const updateContent = async () => {
    standardContents.value = contents.value.filter(
      (content) => content.labels.find((label: Label) => label.name === 'Standaard sjabloon'));

    contents.value = contents.value.filter(
      (content) => !content.labels.find((label: Label) => label.name === 'Standaard sjabloon')
    );
  }

  onMounted(() => {
    fetchCategories();
    fetchContent();
  });
</script>

<template>
  <PageTitle>De kennisbank</PageTitle>

  <CategoryBreadCrumb/>

  <SecondaryTitle>Zoeken en filteren</SecondaryTitle>

  <SearchBar v-model="contents" @update:modelValue="updateContent()"/>

  <div v-if="standardContents && standardContents.length > 0" class="row row-cols-2 g-4 pb-4">
    <ContentItem
      v-for="(content, key) in standardContents"
      :key="key"
      :content="content"
    />
  </div>

  <SecondaryTitle
    v-if="(contents && contents.length > 0) && (standardContents && standardContents.length > 0)"
  >
    Overige posts
  </SecondaryTitle>

  <div class="row row-cols-2 g-4 pt-2 pb-4">
    <ContentItem
      v-for="(content, key) in contents"
      :key="key"
      :content="content"
    />
  </div>

  <Teleport to="#sidebar-nav">
    <div v-if="categories && categories.length > 0" class="accordion accordion-flush m-0 p-0" id="categories-accordion">
      <div class="accordion-item m-0 p-0" v-for="(category, key) in categories" :key="key">
        <ContentCategoryNavItem
          :category="category"
          :categoryKey="key"
        />
      </div>
    </div>
  </Teleport>
</template>