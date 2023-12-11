<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { Category } from '@/typings/Content';

  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import httpService from '@/plugins/http/httpService';
  import { CategoryCrumb } from '@/components';

  const route = useRoute();
  const categories: Ref<Category[]> = ref<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await httpService.getRequest<Category[]>(
        `/categories/${route.params.categoryID}/parents`,
        false
      );

      if (response && response.data) {
        categories.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(async () => {
    await fetchCategories();
  });

  watch(() => route.params.categoryID, async (newVal, oldVal) => {
    if (newVal) {
      await fetchCategories();
    }
    console.log(`Route parameter changed from ${oldVal} to ${newVal}`);
  });
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <RouterLink :to="{ name: 'knowledgeBase.overview' }">
          Kennisbank
        </RouterLink>
      </li>

      <CategoryCrumb v-if="route.params.categoryID" :category="categories"/>
    </ol>
  </nav>
</template>