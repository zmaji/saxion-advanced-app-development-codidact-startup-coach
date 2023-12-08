<script setup lang="ts">
  import type { paddingBottomOptions, paddingTopOption } from './..';

  interface Props {
    paddingBottom?: paddingBottomOptions | null;
    paddingTop?: paddingTopOption | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    paddingBottom: 'pb-2',
    paddingTop: 'pt-2',
  });
</script>

<template>
  <p :class="[props.paddingBottom, props.paddingTop]" class="fw-medium mb-0">
    <slot></slot>
  </p>
</template>