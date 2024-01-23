<script setup lang="ts">
  import type { Company } from '@/typings/Company';
  import type { Ref } from 'vue';
  
  import VueMultiselect from 'vue-multiselect'
  import { ref, onMounted } from 'vue';

  import httpService from '@/plugins/http/httpService';

  let selectedCompanies: Ref<Company[]> = ref([])
  let companies: Ref<Company[]> = ref<Company[]>([]);

  interface Props {
    modelValue?: Company[]
  }

  withDefaults(defineProps<Props>(), {
    modelValue: undefined
  });

  const fetchCompanies = async () => {
    try {
      const response = await httpService.getRequest<Company[]>('/companies', true);

      if (response && response.data) {
        companies.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    fetchCompanies();
  });
</script>

<template>
  <VueMultiselect
    v-model="selectedCompanies"
    tag-placeholder="Dit bedrijf bestaat niet"
    placeholder="Selecteer bedrijven om uit te nodigen"
    label="name"
    track-by="companyID"
    :options="companies"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
  />
</template>
