<script setup lang="ts">
  import type { Category } from '@/typings/Content';

  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import httpService from '@/plugins/http/httpService';
  import { CategoryCrumb } from '@/components';

  const route = useRoute();
  const category = ref<Category>();

  const fetchCategories = async () => {
    if (route.params.categoryID) {
      try {
        const response = await httpService.getRequest<Category>(
          `/categories/${route.params.categoryID}/parents`,
          false
        );

        if (response && response.data) {
          category.value = response.data;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  onMounted(async () => {
    await fetchCategories();
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  watch(() => route.params.categoryID, async (newVal, oldVal) => {
    if (newVal) {
      await fetchCategories();
    }
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

      <CategoryCrumb v-if="route.params.categoryID && category" :category="category" />
    </ol>
  </nav>
</template>