<script setup lang="ts">
  import type { User } from '@/typings/User';
  import type { Ref } from 'vue';
  import type { Roadmap } from '@/typings/Roadmap';
  import type { Company } from '@/typings/Company';

  import { onMounted, ref } from 'vue';
  import { jwtDecode } from 'jwt-decode';

  import {
    PageTitle,
    RoadmapModule,
    SubTitle,
    TextButton,
  } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import { useTokenStore } from '@/stores/token';

  const loaded = ref(false);
  const roadmap: Ref<Roadmap | undefined> = ref<Roadmap>();
  const userCompany: Ref<Company | undefined> = ref<Company>();
  const tokenStore = useTokenStore()
  const currentUser = ref<User | null>(null)
  const currentUserID = ref<string | undefined>('');

  const fetchUserData = async () => {
    try {
      const userToken = tokenStore.getToken;
      currentUser.value = jwtDecode(userToken);
      currentUserID.value = currentUser.value?.userID;
    } catch (error) {
      console.error('Error fetching current userID:', error);
    }
  };

  const fetchUserCompany = async () => {
    try {
      const response = await httpService.getRequest<Company>(`/companies/${currentUser.value?.company}`, true);

      if (response && response.data) {
        userCompany.value = response.data;

        if (userCompany.value.companyAnalysis) {
          await fetchRoadmap();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      loaded.value = true;
    }
  }

  const fetchRoadmap = async () => {
    try {
      const response = await httpService.getRequest<Roadmap>('/roadmaps/companyRoadmap', true);

      if (response && response.data) {
        roadmap.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    fetchUserData().then(fetchUserCompany);
  });
</script>

<template>
  <div v-if="loaded && userCompany">
    <PageTitle>De Roadmap van {{ userCompany.name }}</PageTitle>

    <template v-if="userCompany.companyAnalysis && roadmap">
      <SubTitle>{{ roadmap.description }}</SubTitle>

      <div class="row row-cols-3 g-2 g-lg-3">
        <RoadmapModule v-for="(module, key) in roadmap.modules" :module="module" :key="key"/>
      </div>
    </template>

    <div v-else>
      <SubTitle>
        De behoefte analyse is nog niet ingevuld,
        voordat u met de roadmap kunt beginnen moet u eerst de behoefte analyse voltooien.
      </SubTitle>

      <TextButton type="primary" :to="{ name: 'company.overview'}">Naar behoefte analyse</TextButton>
    </div>
  </div>
</template>