<script setup lang="ts">
  import type { User } from '@/typings/User';
  import type { Ref } from 'vue';
  import type { Roadmap } from '@/typings/Roadmap';

  import { onMounted, ref } from 'vue';
  import { jwtDecode } from 'jwt-decode';

  import {
    PageTitle,
    SecondaryTitle,
    SubTitle,
    TextLabel
  } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import { useTokenStore } from '@/stores/token';

  const loaded = ref(false);
  const roadmap: Ref<Roadmap | undefined> = ref<Roadmap>();
  const tokenStore = useTokenStore()
  const currentUser = ref<User | null>(null)
  const currentUserID = ref<string | undefined>('');

  // const canReview = computed(() => content.value?.contentUsers?.some(
  //   user => user.userID === currentUser.value?.userID)
  // );
  
  const fetchRoadmap = async () => {
    try {
      const response = await httpService.getRequest<Roadmap>('/roadmaps/companyRoadmap', true);

      if (response && response.data) {
        roadmap.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loaded.value = true;
    }
  }

  const fetchUserData = async () => {
    try {
      const userToken = tokenStore.getToken;
      currentUser.value = jwtDecode(userToken);
      currentUserID.value = currentUser.value?.userID;

    } catch (error) {
      console.error('Error fetching current userID:', error);
    }
  };

  onMounted(() => {
    fetchRoadmap();
    fetchUserData();
  });
</script>

<template>
  <PageTitle>De Roadmap van {{ currentUser?.company }}</PageTitle>

  <SubTitle>Overzicht van roadmap</SubTitle>

  <SecondaryTitle>Secondary header</SecondaryTitle>

  <div class="row row-cols-3 g-2 g-lg-3">
    <div v-for="(module, key) in roadmap?.modules" class="col" :key="key">
      <div class="rounded px-4 py-3 shadow-sm bg-white">
        <h4 class="mb-0 pb-1">{{ module.name }}</h4>

        <TextLabel
          type="success-subtle"
          textType="success"
          fontWeight="medium"
          class="d-inline-block"
        >Voltooid
        </TextLabel>
      </div>
    </div>
  </div>
</template>