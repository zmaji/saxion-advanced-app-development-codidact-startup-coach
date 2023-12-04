<script setup lang="ts">
  import type { paddingBottomOptions, paddingTopOption } from './..';

  interface Props {
    paddingBottom?: paddingBottomOptions | null;
    paddingTop?: paddingTopOption | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    paddingBottom: null,
    paddingTop: 'pt-2',
  });
</script>

<template>
  <h2 :class="[props.paddingBottom, props.paddingTop]">
    <slot></slot>
  </h2>
</template>