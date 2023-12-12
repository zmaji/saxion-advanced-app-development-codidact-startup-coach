<script setup lang="ts">

  import type { Category } from '@/typings/Category';
  import type { Ref } from 'vue';

  import { onMounted, ref } from 'vue';

  import {
    CategoryBreadCrumb,
    ContentCategoryNavItem,
    IconLabel,
    TextLabel,
    PageTitle,
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

  <CategoryBreadCrumb/>

  <SecondaryTitle>Zoeken en filteren</SecondaryTitle>

  <div class="row row-cols-2 g-4 pt-5 pb-4">
    <div class="col">
      <div class="bg-white p-4 border rounded position-relative">
        <IconLabel
          icon="file"
          type="success"
          display-style="secondary"
          class="showcase-label"
        >
          Standaard sjabloon
        </IconLabel>

        <p class="fw-medium">Bericht na diepte-interviews in de planning voor volgende week!</p>

        <div class="d-flex flex-row flex-wrap justify-content-start pb-2">
          <div class="d-flex align-items-center pe-4">
            <IconLabel
              icon="thumbs-up"
              type="success"
              display-style="secondary"
            />

            <span class="text-secondary">867</span>
          </div>

          <div class="d-flex align-items-center">
            <IconLabel
              icon="calendar-days"
              type="primary"
              display-style="secondary"
            />

            <span class="text-secondary">10 februari 2023</span>
          </div>
        </div>

        <div class="d-flex flex-row flex-wrap">
          <TextLabel>Standaard sjabloon</TextLabel>
          <TextLabel>Interviews</TextLabel>
          <TextLabel>Communicatie</TextLabel>
        </div>
      </div>
    </div>
  </div>

  <SecondaryTitle>Overige posts</SecondaryTitle>

  <Teleport to="#knowledge-base-nav">
    <div class="accordion accordion-flush m-0 p-0" id="categories-accordion">
      <div class="accordion-item m-0 p-0" v-for="(category, key) in categories" :key="key">
        <ContentCategoryNavItem
          :category="category"
          :categoryKey="key"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  .showcase-label {
    position: absolute;
    top: -1rem
  }
</style>