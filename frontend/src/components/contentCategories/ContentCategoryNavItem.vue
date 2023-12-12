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
    <div class="accordion-header position-relative">
      <RouterLink
        :to="{ name: 'knowledgeBase.overview', params: { categoryID: category.categoryID} }"
        class="py-3"
      >
        {{ category.name }}
      </RouterLink>

      <button
        v-if="category.subCategories && category.subCategories.length > 0"
        class="accordion-button collapsed shadow-none"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#flush-collapse${category.categoryID}`"
        aria-expanded="false"
        :aria-controls="`flush-collapse${category.categoryID}`"
      />
    </div>

    <div
      :id="`flush-collapse${category.categoryID}`"
      class="accordion-collapse collapse"
      :data-bs-parent="`#categories-accordion${categoryKey}`"
    >
      <ContentCategoryNavItem
        v-for="(subCategory, key) in category.subCategories" :key="key"
        :category="subCategory"
        :categoryKey="key"
        class="ps-3"
      />
    </div>
  </div>
</template>

<style scoped>
  .accordion-button {
    position: absolute;
    width: auto;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent!important;
  }

  .accordion-button:not(.collapsed) {
    background-color: transparent!important;
  }
</style>