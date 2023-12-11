<script setup lang="ts">

  import type { Category } from '@/typings/Content';

  import {
    ContentCategory,
    PageTitle,
    SubTitle,
    SecondaryTitle
  } from '@/components';

  const categories: Category[] = [
    {
      categoryID: '1',
      name: 'Main Category 1',
      subCategories: [
        {
          categoryID: '1-1',
          parentCategory: '1',
          name: 'Subcategory 1-1',
          subCategories: [
            {
              categoryID: '1-1-1',
              parentCategory: '1-1',
              name: 'Sub-subcategory 1-1-1'
            },
            {
              categoryID: '1-1-2',
              parentCategory: '1-1',
              name: 'Sub-subcategory 1-1-2'
            }
          ]
        },
        {
          categoryID: '1-2',
          parentCategory: '1',
          name: 'Subcategory 1-2'
        }
      ]
    }

  ];

</script>

<template>
  <PageTitle>De kennisbank</PageTitle>

  <SubTitle>Overzicht van roadmap</SubTitle>

  <SecondaryTitle>Secondary header</SecondaryTitle>

  <div class="accordion accordion-flush" id="categories-accordion">
    <div class="accordion-item" v-for="(category, key) in categories" :key="key">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#flush-collapse${category.categoryID}`"
          aria-expanded="false"
          :aria-controls="`flush-collapse${category.categoryID}`"
        >
          {{ category.name }}
        </button>
      </h2>

      <div
        :id="`flush-collapse${category.categoryID}`"
        class="accordion-collapse collapse"
        :data-bs-parent="`#categories-accordion${key}`"
      >
        <div class="accordion-body">
          <ContentCategory
            :category="category"
            :categoryKey="key"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>