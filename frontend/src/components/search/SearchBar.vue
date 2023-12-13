<script setup lang="ts">
import { ref } from 'vue';
import httpService from '@/plugins/http/httpService';
import type { Content } from '@/typings/Content';
import ContentItem from '@/components/content/ContentItem.vue';

const searchQuery = ref('');
const labelFilter = ref('');
const categoryFilter = ref('');
const searchResults = ref<Content[]>([]);

const search = async () => {
  try {
    const response = await httpService.getRequest<Content[]>(
      `/content/?title=${searchQuery.value}&labels=${labelFilter.value}&category=${categoryFilter.value}`,
      false
    );

    if (response) {
      searchResults.value = response.data;
    }
  } catch (e) {
    console.error('Er is een fout opgetreden bij het uitvoeren van de zoekopdracht:', e);
  }
};
</script>

<template>
  <div>
    <div class="mb-3">
      <label for="searchInput" class="form-label">Zoekopdracht:</label>
      <input v-model="searchQuery" id="searchInput" type="text" class="form-control" placeholder="Typ hier uw zoekopdracht" />
    </div>

    <div class="mb-3">
      <label for="labelFilter" class="form-label">Filter op Label:</label>
      <input v-model="labelFilter" id="labelFilter" type="text" class="form-control" placeholder="Filter op label" />
    </div>

    <div class="mb-3">
      <label for="categoryFilter" class="form-label">Filter op Categorie:</label>
      <input v-model="categoryFilter" id="categoryFilter" type="text" class="form-control" placeholder="Filter op categorie" />
    </div>

    <button @click="search" class="btn btn-primary">Zoeken</button>

    <div v-if="searchResults.length > 0">
      <h2>Resultaten:</h2>
      <div class="row row-cols-2 g-4 pt-3 pb-4">
        <ContentItem
          v-for="(content, key) in searchResults"
          :key="key"
          :content="content"
        />
      </div>
    </div>

    <div v-else>
      <p>Geen resultaten gevonden.</p>
    </div>
  </div>
</template>

<style scoped>

</style>
