<script setup lang="ts">
  interface Props {
    type?: string,
    textType?: string,
    fontWeight?: string,
  }

  withDefaults(defineProps<Props>(), {
    type: 'secondary-subtle',
    textType: 'light-emphasis',
    fontWeight: 'regular'
  });
</script>

<template>
  <span
    :class="[`bg-${type}`, `text-${textType}`, `fw-${fontWeight}`]"
    class="px-4 py-2 me-2 mt-2 rounded-pill"
  >
    <slot></slot>
  </span>
</template>