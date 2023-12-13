<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { Content } from '@/typings/Content';
  import type { Category } from '@/typings/Category';
  import type { Label } from '@/typings/Label';

  import { onMounted, ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
  const labelFilter = ref([]);
  const categoryFilter = ref<Category>('');
  const searchResults = ref<Content[]>([]);
  const categories: Ref<Category[]> = ref<Category[]>([]);
  const labels: Ref<Label[]> = ref<Label[]>([]);
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

  const removeLabel = (selectedLabel: Label): void => {
    const index = labelFilter.value.findIndex(label => label.labelID === selectedLabel.labelID);

    if (index !== -1) {
      labelFilter.value.splice(index, 1);
    }
  }

  onMounted(() => {
    fetchCategories();
    fetchLabels();
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

        <div v-if="labelFilter.length > 0" class="d-flex flex-direction-row flex-wrap pt-3">
          <div
            v-for="(label, key) in labelFilter"
            :key="key"
            class="bg-secondary text-white px-3 py-1 rounded-pill me-2 mb-2"
          >
            {{label}}

            <FontAwesomeIcon icon="circle-xmark" class="ps-2 label-icon" @click="removeLabel(label)"/>
          </div>
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
              <select id="labelFilter" class="form-select" aria-label="Label select" v-model="labelFilter" multiple>
                <option selected disabled> een of meerdere labels</option>

                <option
                  v-for="(label, key) in labels"
                  :key="key"
                  :value="label.name"
                >
                  {{ label.name }}
                </option>
              </select>
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

  .label-icon:hover {
    cursor: pointer;
  }
</style>
