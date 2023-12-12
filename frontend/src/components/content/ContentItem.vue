<script setup lang="ts">
  import type { Content } from '@/typings/Content';
  import type { Label } from '@/typings/Label';

  import { IconLabel, TextLabel } from '@/components';

  interface Props {
    content: Content
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="col">
    <div class="bg-white p-4 border rounded position-relative h-100">
      <IconLabel
        v-if="content.labels.find((label: Label) => label.name === 'Standaard sjabloon')"
        icon="file"
        type="success"
        display-style="secondary"
        class="showcase-label"
      >
        Standaard sjabloon
      </IconLabel>

      <p class="fw-medium">{{ content.title }}</p>

      <div class="d-flex flex-row flex-wrap justify-content-start pb-2">
        <div class="d-flex align-items-center pe-4">
          <IconLabel
            icon="thumbs-up"
            type="success"
            display-style="secondary"
          />

          <span class="text-secondary">867</span>
        </div>

        <div class="d-flex align-items-center">
          <IconLabel
            icon="calendar-days"
            type="primary"
            display-style="secondary"
          />

          <span class="text-secondary">{{ content.createdAt }}</span>
        </div>
      </div>

      <div class="d-flex flex-row flex-wrap">
        <TextLabel
          v-for="(label, key) in content.labels"
          :key="key"
        >
          {{ label.name}}
        </TextLabel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase-label {
  position: absolute;
  top: -1rem
}
</style>
