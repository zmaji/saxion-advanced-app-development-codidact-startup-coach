<script setup lang="ts">
  import type { Module } from '@/typings/Module';

  import { TextLabel } from '@/components';
  import { StepStatuses } from '@/enums/StepStatuses';
  import { determineModuleProgress } from '@/utils/roadmapModule';

  interface Props {
    module: Module
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <RouterLink
    :to="{ name: 'company.roadmap.module', params: { moduleID: module!.moduleID } }"
    class="col text-decoration-none"
  >
    <div class="rounded px-4 py-3 shadow-sm bg-white">
      <h4 class="mb-0 pb-1">{{ module.name }}</h4>

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
    </div>
  </RouterLink>
</template>