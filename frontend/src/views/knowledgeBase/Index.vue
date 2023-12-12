<script setup lang="ts">

import type { Category } from '@/typings/Category';
import type { Ref } from 'vue';

import { onMounted, ref } from 'vue';

import {
  ContentCategory,
  CategoryBreadCrumb,
  PageTitle,
  SubTitle,
  SecondaryTitle
} from '@/components';
import httpService from '@/plugins/http/httpService';

const categories: Ref<Category[]> = ref<Category[]>([]);

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

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <PageTitle>De kennisbank</PageTitle>

  <SubTitle>Overzicht van roadmap</SubTitle>

  <SecondaryTitle>Secondary header</SecondaryTitle>

  <CategoryBreadCrumb />

  <div class="accordion accordion-flush" id="categories-accordion">
    <div class="accordion-item" v-for="(category, key) in categories" :key="key">
      <ContentCategory :category="category" :categoryKey="key" />
    </div>
  </div>
</template>

<style scoped></style>