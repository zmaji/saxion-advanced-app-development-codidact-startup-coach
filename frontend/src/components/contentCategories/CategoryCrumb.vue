<script setup lang="ts">
  import type { Category } from '@/typings/Content';

  interface Props {
    category: Category
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <li class="breadcrumb-item">
    <RouterLink :to="{ name: 'knowledgeBase.overview', params: { categoryID: category.categoryID} }">
      {{ category.name }}
    </RouterLink>
  </li>

  <CategoryCrumb
    v-if="category.subCategories && category.subCategories.length > 0"
    :category="category.subCategories[0]"
  />
</template>@/typings/content