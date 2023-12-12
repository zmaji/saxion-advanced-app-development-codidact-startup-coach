<script setup lang="ts">
  import type { Company } from '@/typings/Company';
  import type { Ref } from 'vue';
  
  import VueMultiselect from 'vue-multiselect'
  import { ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import { SmallHeader } from '@/components';

  let selectedCompanies: Ref<Company[]> = ref([])
  let companyOptions: Ref<Company[]> = ref<Company[]>([
    {
      companyID: '1',
      name: 'Saxion',
      location: ''
    },
    {
      companyID: '2',
      name: 'Inversable',
      location: ''
    },
    {
      companyID: '3',
      name: 'Topicus',
      location: ''
    },
    {
      companyID: '4',
      name: 'Google',
      location: ''
    },
  ]);

  const removeCompany = (selectedCompany: Company): void => {
    const index = selectedCompanies.value.findIndex(company => company.companyID === selectedCompany.companyID);

    if (index !== -1) {
      selectedCompanies.value.splice(index, 1);
    }
  }

</script>

<template>
  <VueMultiselect
    v-model="selectedCompanies"
    tag-placeholder="Dit bedrijf bestaat niet"
    placeholder="Selecteer bedrijven om uit te nodigen"
    label="name"
    track-by="companyID"
    class="pb-2"
    :options="companyOptions"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
  />

  <SmallHeader>Geselecteerde bedrijven</SmallHeader>

  <div class="d-flex flex-direction-row flex-wrap">
    <div
      v-for="(company,key) in selectedCompanies"
      :key="key"
      class="bg-secondary text-white px-3 py-1 rounded-pill me-2 mb-2"
    >
      {{company.name}}

      <FontAwesomeIcon icon="circle-xmark" class="ps-2 label-icon" @click="removeCompany(company)"/>
    </div>
  </div>
</template>

<style scoped>
  .label-icon:hover {
    cursor: pointer;
  }
</style>
