<script setup lang="ts">

  import type { Category } from '@/typings/Content';

  interface Props {
    category: Category;
    categoryKey: number;
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="accordion-item">
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
      :data-bs-parent="`#categories-accordion${categoryKey}`"
    >
      <div class="accordion-body">
        <ContentCategory
          v-for="(subCategory, key) in category.subCategories" :key="key"
          :category="subCategory"
          :categoryKey="key"
        />
      </div>
    </div>
  </div>
</template>