<script setup lang="ts">
  import type { Step } from '@/typings/Step';

  import { TextLabel } from '@/components';
  import { StepStatuses } from '@/enums/StepStatuses';

  interface Props {
    step: Step,
    stepNumber: number
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="col-12 mb-3">
    <div class="d-flex flex-row justify-content-between align-items-center
    flex-wrap rounded px-4 py-3 shadow-sm bg-white">
      <div class="d-flex flex-row">
        <div class="d-flex align-items-center justify-content-center pe-4">
          <span class="step-counter">{{ stepNumber }}</span>
        </div>

        <div>
          <h4 class="mb-0 pb-1">{{ step.name }}</h4>

          <p>{{ step.description }}</p>
        </div>
      </div>

      <div class="">
        <TextLabel
          v-if="step.status === StepStatuses.toStart"
          fontWeight="medium"
          class="d-inline-block"
        >
          Nog niet begonnen
        </TextLabel>

        <TextLabel
          v-if="step.status === StepStatuses.inProgress"
          type="warning-subtle"
          textType="warning"
          fontWeight="medium"
          class="d-inline-block"
        >
          In uitvoering
        </TextLabel>

        <TextLabel
          v-if="step.status === StepStatuses.finished"
          type="success-subtle"
          textType="success"
          fontWeight="medium"
          class="d-inline-block"
        >
          Voltooid
        </TextLabel>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .step-counter {
    background-color: var(--bs-primary-bg-subtle);
    color: var(--bs-primary);
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    font-weight: bold;

  }
</style>