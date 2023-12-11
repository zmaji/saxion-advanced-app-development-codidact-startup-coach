<script setup lang="ts">

  import type { Category } from '@/typings/Content';
  import type { Ref } from 'vue';

  import { onMounted, ref } from 'vue';

  import {
    ContentCategory,
    PageTitle,
    SubTitle,
    SecondaryTitle
  } from '@/components';
  import httpService from '@/plugins/http/httpService';

  // const categories: Category[] = [
  //   {
  //     categoryID: '1',
  //     name: 'Main Category 1',
  //     subCategories: [
  //       {
  //         categoryID: '1-1',
  //         parentCategory: '1',
  //         name: 'Subcategory 1-1',
  //         subCategories: [
  //           {
  //             categoryID: '1-1-1',
  //             parentCategory: '1-1',
  //             name: 'Sub-subcategory 1-1-1'
  //           },
  //           {
  //             categoryID: '1-1-2',
  //             parentCategory: '1-1',
  //             name: 'Sub-subcategory 1-1-2'
  //           }
  //         ]
  //       },
  //       {
  //         categoryID: '1-2',
  //         parentCategory: '1',
  //         name: 'Subcategory 1-2'
  //       }
  //     ]
  //   },
  //   {
  //     categoryID: '2',
  //     name: 'Main Category 2',
  //     subCategories: []
  //   }
  // ];

  const categories: Ref<Category[]> = ref<Category[]>([]);

  const fetchCategories = async () => {

    try {
      const response = await httpService.getRequest<Category[]>('/categories', false);
      console.log(response.data)

      if (response && response.data) {
        categories.value = response.data;
      }
    } catch (e) {
      console.log(e);
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

  <div class="accordion accordion-flush" id="categories-accordion">
    <div class="accordion-item" v-for="(category, key) in categories" :key="key">
      <ContentCategory
        :category="category"
        :categoryKey="key"
      />
    </div>
  </div>
</template>

<style scoped>

</style>