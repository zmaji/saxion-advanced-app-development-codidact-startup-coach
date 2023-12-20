<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { Content } from '@/typings/Content';
  import type { Category } from '@/typings/Category';
  import type { Label } from '@/typings/Label';

  import { onMounted, ref, watch } from 'vue';
  import VueMultiselect from 'vue-multiselect';
  import { useRoute } from 'vue-router';

  import httpService from '@/plugins/http/httpService';
  import {
    SmallHeader,
    IconButton,
    TextButton,
    SubTitle
  } from '@/components';
import router from '@/router';

  interface Props {
    modelValue?: Content[]
  }

  withDefaults(defineProps<Props>(), {
    modelValue: undefined
  });

  const route = useRoute();

  const searchQuery = ref('');
  const labelFilter = ref<Label[]>([]);
  const categoryFilter = ref<Category>();
  const searchResults = ref<Content[]>([]);
  const categories: Ref<Category[]> = ref<Category[]>([]);
  const labels: Ref<Label[]> = ref<Label[]>([]);
  const emit = defineEmits<{(event: 'update:modelValue', value: Content[]): void}>();

  const search = async () => {
    try {
      const filteredLabelNames = labelFilter.value.map(({ name }) => name);

      const response = await httpService.getRequest<Content[]>(
        `/content?title=${searchQuery.value}` +
          `&labels=${filteredLabelNames}` +
          `&category=${categoryFilter.value ? categoryFilter.value.categoryID : ''}`,
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
      const response = await httpService.getRequest<Category[]>('/categories/flattened', false);

      if (response && response.data) {
        categories.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const fetchLabels = async () => {
    try {
      const response = await httpService.getRequest<Label[]>('/labels', false);

      if (response && response.data) {
        labels.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const resetFilters = ():void => {
    searchQuery.value = '';
    labelFilter.value = [];
    categoryFilter.value = undefined;
    
    router.push({ name: 'knowledgeBase.overview' });

    search();
  }

  onMounted(() => {
    fetchCategories();
    fetchLabels();
  });

  watch(() => route.params.categoryID, async (currentCategory) => {
    if (currentCategory) {
      const matchedCategory = categories.value.find(category => category.categoryID === currentCategory);
      if (matchedCategory) {
        categoryFilter.value = matchedCategory;
      }
    } else {
      categoryFilter.value = undefined;
    }
    await search();
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
            @keyup.enter="search"
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
          class="me-2"
          display-style="secondary"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-filters"
          aria-expanded="false"
          aria-controls="collapse-filters"
        >
          Filters

          <span v-if="(labelFilter && labelFilter.length > 0) || categoryFilter">
            {{ `(${labelFilter.length + (categoryFilter ? 1 : 0)})` }}
          </span>
        </IconButton>

        <IconButton
          v-if="(searchQuery && searchQuery.length > 0) || (labelFilter && labelFilter.length > 0) || categoryFilter"
          icon="arrows-rotate"
          type="primary"
          display-style="tertiary"
          @click="resetFilters"
        >
          Reset filters
        </IconButton>

        <div class="collapse pt-2 filter-menu" id="collapse-filters">
          <div class="bg-white p-4 border rounded">
            <div class="pb-3">

              <label for="labelFilter" class="form-label">Selecteer Label(s):</label>

              <VueMultiselect
                v-model="labelFilter"
                placeholder="Selecteer de gewenste label(s)"
                label="name"
                selectedLabel="Geselecteerd"
                selectLabel="Druk enter om te selecteren"
                deselectLabel="Druk enter om te verwijderen"
                track-by="labelID"
                class="pb-2"
                id="labelFilter"
                :options="labels"
                :multiple="true"
                :close-on-select="false"
              />
            </div>

            <div class="pb-3">
              <label for="categoryFilter" class="form-label">Selecteer een categorie</label>
              <select id="categoryFilter" class="form-select" aria-label="Category select" v-model="categoryFilter">
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
