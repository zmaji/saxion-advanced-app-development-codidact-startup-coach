<script setup lang="ts">
  import type { Content } from '@/typings/Content';
  import type { Label } from '@/typings/Label';

  import { IconLabel, TextLabel } from '@/components';

  interface Props {
    content: Content
  }

  withDefaults(defineProps<Props>(), {});

  type CustomDateFormat = `${number} ${string} ${number}`;

  const formatDate = (dateString: string): CustomDateFormat | null => {
    const inputDate = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('nl-NL', options).format(inputDate);

    return formattedDate as CustomDateFormat;
  };

</script>

<template>
  <div class="col">
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

        <p class="fw-medium mb-0">{{ content.title }}</p>

        <div class="d-flex flex-row flex-wrap ">
          <TextLabel
            v-for="(label, key) in content.labels.slice(0, 3)"
            :key="key"
          >
            {{ label.name}}
          </TextLabel>

          <TextLabel v-if="content.labels.length > 3">
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

        <div class="d-flex align-items-center">
          <IconLabel
            icon="calendar-days"
            type="primary"
            display-style="secondary"
          />

          <span class="text-secondary">{{ formatDate(content.createdAt) }}</span>
        </div>
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
