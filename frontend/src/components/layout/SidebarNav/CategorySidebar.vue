<script setup lang="ts">
  import type { Category } from '@/typings/Category';

  import { onMounted, ref, Ref } from 'vue';

  import ContentCategoryNavItem from '@/components/contentCategories/ContentCategoryNavItem.vue';
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
  <Teleport to="#sidebar-nav">
    <div v-if="categories && categories.length > 0" class="accordion accordion-flush m-0 p-0" id="categories-accordion">
      <div class="accordion-item m-0 p-0" v-for="(category, key) in categories" :key="key">
        <ContentCategoryNavItem
          :category="category"
          :categoryKey="key"
        />
      </div>
    </div>
  </Teleport>
</template>