<script setup lang="ts">
import { ref } from 'vue';
import httpService from '@/plugins/http/httpService';
import type { Content } from '@/typings/Content';
import ContentItem from '@/components/content/ContentItem.vue';

const searchQuery = ref('');
const searchResults = ref<Content[]>([]);

const search = async () => {
  try {
    const response = await httpService.getRequest<Content[]>(
      `/content/?title=${searchQuery.value}`,
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
    <input v-model="searchQuery" type="text" placeholder="Typ hier uw zoekopdracht" />
    <button @click="search">Zoeken</button>

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
