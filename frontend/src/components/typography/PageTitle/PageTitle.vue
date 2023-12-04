<script setup lang="ts">
  import type { paddingBottomOptions, paddingTopOption } from './..';

  interface Props {
    paddingBottom?: paddingBottomOptions | null;
    paddingTop?: paddingTopOption | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    paddingBottom: null,
    paddingTop: null,
  });
</script>

<template>
  <h1 :class="[props.paddingBottom, props.paddingTop]">
    <slot></slot>
  </h1>
</template>

<style scoped>

</style>