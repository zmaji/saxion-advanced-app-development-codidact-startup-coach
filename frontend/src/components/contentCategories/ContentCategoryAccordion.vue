<script setup lang="ts">
  import type { Category } from '@/typings/Category';

  import { ContentCategory } from '@/components';

  interface Props {
    categories: Category[];
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="accordion accordion-flush" id="categories-accordion">
    <div class="accordion-item" v-for="(category, key) in categories" :key="key">
      <ContentCategory
        :category="category"
        :categoryKey="key"
      />
    </div>
  </div>
</template>