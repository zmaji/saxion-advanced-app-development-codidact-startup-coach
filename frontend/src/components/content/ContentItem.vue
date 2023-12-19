<script setup lang="ts">
  import type { Content } from '@/typings/Content';
  import type { Label } from '@/typings/Label';

  import { DateLabel, IconLabel, TextLabel } from '@/components';

  interface Props {
    content: Content
  }

  withDefaults(defineProps<Props>(), {});
</script>

<template>
  <RouterLink
    :to="{ name: 'knowledgeBase.show', params: { contentID: content.contentID} }"
    class="col text-decoration-none"
  >
    <div class="bg-white p-4 border rounded position-relative h-100 d-flex flex-column justify-content-between">
      <div class="pb-3">
        <IconLabel
          v-if="content.labels.find((label: Label) => label.name === 'Standaard sjabloon')"
          icon="file"
          type="success"
          display-style="secondary"
          class="showcase-label"
        >
          Standaard sjabloon
        </IconLabel>

        <p class="fw-medium mb-0 text-dark">{{ content.title }}</p>

        <div class="d-flex flex-row flex-wrap ">
          <TextLabel
            v-for="(label, key) in content.labels.slice(0, 3)"
            :key="key"
            class="mt-2"
          >
            {{ label.name}}
          </TextLabel>

          <TextLabel v-if="content.labels.length > 3" class="mt-2">
            {{ content.labels.length - 3 }} +
          </TextLabel>
        </div>
      </div>

      <div class="d-flex flex-row flex-wrap justify-content-start">
        <div class="d-flex align-items-center pe-4">
          <IconLabel
            icon="thumbs-up"
            type="success"
            display-style="secondary"
          />

          <span class="text-secondary">867</span>
        </div>

        <DateLabel :date="content.createdAt"/>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.showcase-label {
  position: absolute;
  top: -1rem
}
</style>
