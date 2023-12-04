<script setup lang="ts">
  import type { marginBottomOptions, marginTopOptions } from './..';

  interface Props {
    marginBottom?: marginBottomOptions | null;
    marginTop?: marginTopOptions | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    marginBottom: null,
    marginTop: null,
  });
</script>

<template>
  <p :class="props.marginBottom" class="d-inline-block px-3 py-2 bg-secondary-subtle rounded text-dark">
    <slot></slot>
  </p>
</template>