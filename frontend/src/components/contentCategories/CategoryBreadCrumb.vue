<script setup lang="ts">
  import type { Category } from '@/typings/Category';

  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import httpService from '@/plugins/http/httpService';
  import { CategoryCrumb } from '@/components';

  const route = useRoute();
  const category = ref<Category>();

  interface Props {
    categoryID?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    categoryID: undefined,
  });

  const fetchCategories = async () => {
    try {
      const currentCategory = props.categoryID ? props.categoryID : route.params.categoryID;
      const response = await httpService.getRequest<Category>(
        `/categories/${currentCategory}/parents`,
        false
      );

      if (response && response.data) {
        category.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(async () => {
    await fetchCategories();
  });

  if (!props.categoryID) {
    watch(() => route.params.categoryID, async (currentCategory) => {
      if (currentCategory) {
        await fetchCategories();
      }
    });
  }
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <RouterLink :to="{ name: 'knowledgeBase.overview' }">
          Kennisbank
        </RouterLink>
      </li>

      <CategoryCrumb v-if="category" :category="category" />
    </ol>
  </nav>
</template>