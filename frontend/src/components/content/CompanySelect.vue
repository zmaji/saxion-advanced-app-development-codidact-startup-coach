<script setup lang="ts">
  import type { ContentCompany } from '@/typings/company';

  import VueMultiselect from 'vue-multiselect'
  import { Ref, ref } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import { SmallHeader } from '@/components';

  let selectedCompanies: Ref<ContentCompany[]> = ref([])
  let companyOptions: Ref<ContentCompany[]> = ref([
    {
      labelID: 1,
      name: 'Saxion',
    },
    {
      labelID: 2,
      name: 'Inversable',
    },
    {
      labelID: 3,
      name: 'Topicus',
    },
    {
      labelID: 4,
      name: 'Google',
    },
  ]);

  // const addCompany = (newCompany: string) => {
    
  //   const result = {
  //     labelID: companyOptions.value.length + 1,
  //     name: newCompany
  //   };

  //   companyOptions.value.push(result);
  //   selectedCompanies.value.push(result);
  // }

  const removeCompany = (selectedCompany: ContentCompany): void => {
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
    track-by="labelID"
    class="pb-2"
    :options="companyOptions"
    :multiple="true"
    :taggable="true"
    :close-on-select="false"
  />

  <SmallHeader>Geselecteerde companies</SmallHeader>

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
