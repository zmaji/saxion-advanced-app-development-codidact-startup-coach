<script setup lang="ts">
  import type { Category } from '@/typings/Category';

  interface Props {
    category: Category;
    categoryKey: number;
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="accordion-item">
    <div class="accordion-header d-flex flex-row flex-wrap justify-content-between align-items-center">
      <div class="px-4 py-3">
        <RouterLink :to="{ name: 'knowledgeBase.overview', params: { categoryID: category.categoryID } }">
          {{ category.name }}
        </RouterLink>
      </div>

      <div v-if="category.subCategories && category.subCategories.length > 0">
        <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
          :data-bs-target="`#flush-collapse${category.categoryID}`" aria-expanded="false"
          :aria-controls="`flush-collapse${category.categoryID}`" />
      </div>
    </div>

    <div :id="`flush-collapse${category.categoryID}`" class="accordion-collapse collapse"
      :data-bs-parent="`#categories-accordion${categoryKey}`">
      <ContentCategory v-for="(subCategory, key) in category.subCategories" :key="key" :category="subCategory"
        :categoryKey="key" class="ps-3" />
    </div>
  </div>
</template>

<style scoped>
  .accordion-button:not(.collapsed) {
    background-color: white!important;
  }
</style>
