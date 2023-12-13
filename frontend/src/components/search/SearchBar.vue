<script setup lang="ts">
  import type { Content } from '@/typings/Content';
  import type { Category } from '@/typings/Category';
  import type { Ref } from 'vue';

  import { onMounted, ref } from 'vue';

  import httpService from '@/plugins/http/httpService';
  import {
    SmallHeader,
    IconButton,
    TextButton,
    SubTitle
  } from '@/components';

  interface Props {
    modelValue?: Content[]
  }

  withDefaults(defineProps<Props>(), {
    modelValue: undefined
  });

  const searchQuery = ref('');
  const labelFilter = ref('');
  const categoryFilter = ref<Category>('');
  const searchResults = ref<Content[]>([]);
  const categories: Ref<Category[]> = ref<Category[]>([]);
  const emit = defineEmits<{(event: 'update:modelValue', value: Content[]): void}>();

  const search = async () => {
    try {
      const response = await httpService.getRequest<Content[]>(
        `/content?title=${searchQuery.value}&labels=${labelFilter.value}
        &category=${categoryFilter.value ? categoryFilter.value.categoryID : ''}`,
        false
      );

      if (response) {
        searchResults.value = response.data;
        emit('update:modelValue', searchResults.value);
      }
    } catch (e) {
      console.error('Er is een fout opgetreden bij het uitvoeren van de zoekopdracht:', e);
    }
  };

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
  <div class="pb-4">
    <div class="pb-3 row g-2">
      <div class="col col-lg-5">
        <div class="d-flex flex-row align-items-center">
          <input
            v-model="searchQuery"
            id="searchInput"
            type="text"
            class="form-control me-2 py-2 px-4"
            placeholder="Typ hier uw zoekopdracht"
          />

          <TextButton
            type="primary"
            render-as="button"
            @click="search"
            class="d-inline-block"
          >
            Zoeken
          </TextButton>
        </div>
      </div>

      <div class="col col-lg-5 position-relative">
        <IconButton
          icon="filter"
          type="primary"
          display-style="secondary"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-filters"
          aria-expanded="false"
          aria-controls="collapse-filters"
        >
          Filters
        </IconButton>

        <div class="collapse pt-2 filter-menu" id="collapse-filters">
          <div class="bg-white p-4 border rounded">
            <div class="pb-3">
              <label for="labelFilter" class="form-label">Filter op Label:</label>
              <input
                v-model="labelFilter"
                id="labelFilter"
                type="text"
                class="form-control"
                placeholder="Filter op label"
              />
            </div>

            <div class="pb-3">
              <label for="categoryFilter" class="form-label">Selecteer een categorie</label>
              <select class="form-select" aria-label="Category select" v-model="categoryFilter">
                <option selected value="">Selecteer een categorie</option>

                <option
                  v-for="(category, key) in categories"
                  :key="key"
                  :value="category"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SubTitle v-if="categoryFilter">
      Content binnen de categorie: {{ categoryFilter.name }}
    </SubTitle>

    <div v-if="searchResults.length > 0 && searchQuery.length > 0">
      <SmallHeader>Gevonden resultaten op zoekterm: <b>{{ searchQuery }}</b></SmallHeader>
    </div>

    <div v-else-if="searchResults.length === 0 && searchQuery">
      <SmallHeader>Geen resultaten gevonden op zoekterm: <b>{{ searchQuery }}</b></SmallHeader>
    </div>
  </div>
</template>

<style scoped>
  .filter-menu {
    position: absolute;
    z-index: 100;
    left: 0.25rem;
    right: 0;
  }
</style>
