<script setup lang="ts">
  interface Props {
    type: string,
  }

  withDefaults(defineProps<Props>(), {
    type: 'secondary-subtle'
  });
</script>

<template>
  <span
    :class="`bg-${type}`"
    class="text-light-emphasis px-4 py-2 me-2 mt-2 rounded-pill"
  >
    <slot></slot>
  </span>
</template>