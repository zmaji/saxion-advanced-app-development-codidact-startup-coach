<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { Module } from '@/typings/Module';

  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import { StepStatuses } from '@/enums/StepStatuses';
  import {
    IconButton,
    ModuleStep,
    PageTitle,
    SubHeader,
    TextLabel
  } from '@/components';
  import httpService from '@/plugins/http/httpService';
  import { determineModuleProgress } from '@/utils/roadmapModule';
  
  const route = useRoute();
  const loaded = ref(false);
  const module: Ref<Module | undefined> = ref<Module>();

  const fetchModule = async () => {
    try {
      const response = await httpService.getRequest<Module>(`/modules/${route.params.moduleID}`, true);

      if (response && response.data) {
        module.value = response.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      loaded.value = true;
    }
  }

  onMounted(() => {
    fetchModule();
  });
</script>

<template>
  <div v-if="loaded && module">
    <div class="d-flex flex-row flex-wrap align-items-center">
      <PageTitle>Module: {{ module.name }}</PageTitle>

      <IconButton
        icon="chevron-left"
        type="primary"
        display-style="secondary"
        :render-as-circle="true"
        :to="{ name: 'company.roadmap' }"
        class="ms-3"
      >
        Terug naar roadmap
      </IconButton>
    </div>

    <TextLabel
      v-if="determineModuleProgress(module) === StepStatuses.toStart"
      fontWeight="medium"
      class="d-inline-block"
    >
      Nog niet begonnen
    </TextLabel>

    <TextLabel
      v-if="determineModuleProgress(module) === StepStatuses.inProgress"
      type="warning-subtle"
      textType="warning"
      fontWeight="medium"
      class="d-inline-block"
    >
      {{ module.steps!.filter((step) => step.status === StepStatuses.finished).length }}
      /{{ module.steps!.length }} stappen voltooid
    </TextLabel>

    <TextLabel
      v-if="determineModuleProgress(module) === StepStatuses.finished"
      type="success-subtle"
      textType="success"
      fontWeight="medium"
      class="d-inline-block"
    >
      Voltooid
    </TextLabel>

    <SubHeader>Over deze module</SubHeader>
    <p>{{ module.description }}</p>

    <SubHeader>De stappen van deze module</SubHeader>
    <div v-if="module.steps" class="row">
      <ModuleStep v-for="(step, key) in module.steps" :step="step" :stepNumber="key + 1" :key="key"/>
    </div>
  </div>
</template>