<script setup lang="ts">
  import type { labelTypes, labelDisplayStyles } from '.';

  import IconLabel from '@/components/labels/IconLabel.vue';

  interface Props {
    date: string
    type?: labelTypes;
    displayStyle?: labelDisplayStyles;
  }

  withDefaults(defineProps<Props>(), {
    type: 'primary',
    displayStyle: 'secondary',
  });

  type CustomDateFormat = `${number} ${string} ${number}`;
  const formatDate = (dateString: string): CustomDateFormat | null => {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate.getTime())) {
      console.error('Invalid date:', dateString);

      return null;
    }

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
  <div class="d-flex align-items-center">
    <IconLabel
      icon="calendar-days"
      :type="type"
      :display-style="displayStyle"
    />

    <span class="text-secondary">{{ formatDate(date) }}</span>
  </div>
</template>